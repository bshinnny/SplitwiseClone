from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Expense, Group, UserGroup
from sqlalchemy.orm import joinedload
from app.forms import ExpenseForm, UpdateExpenseForm, GroupForm, EditGroupForm, AddGroupMemberForm
from .auth_routes import validation_errors_to_error_messages


group_routes = Blueprint('groups', __name__)

@group_routes.route('/<int:group_id>/expenses')
@login_required
def get_all_group_routes(group_id):
    """
    Return all expenses for a group based on the group's id
    """
    group = Group.query.get(group_id)

    if(not group):
        return {"error": "Group not found"}, 404

    group_expenses = Expense.query.options(joinedload(Expense.recipient)).options(joinedload(Expense.user)).filter(Expense.group_id == group_id)

    def group_expenses_to_dict(expense):
                return {
            "id": expense.id,
            "description": expense.description,
            "user_id": expense.user_id,
            "group_id": expense.group_id,
            "recipient_id": expense.recipient_id,
            "amount": expense.amount,
            "date": expense.date,
            "note": expense.note,
            "status": expense.status,
            "Fronter": {
                "first_name": expense.user.first_name,
                "last_name": expense.user.last_name,
                "nickname": expense.user.nickname
            },
            "Recipient": {
                "first_name": expense.recipient.first_name,
                "last_name": expense.recipient.last_name,
                "nickname": expense.recipient.nickname
            }
        }

    return {'Group Expenses': [group_expenses_to_dict(item) for item in group_expenses]}


# Get all groups of the current user.
@group_routes.route('/current')
@login_required
def get_user_groups():
    """
    Get all groups of the current user.
    """
    user_id = current_user.get_id()
    # How to query groups from user groups table?
    # user_groups = UserGroup.query.filter(UserGroup.user_id == user_id)
    user_groups = UserGroup.query.options(joinedload(UserGroup.group)).filter(UserGroup.user_id == 1).all()
    # user_groups = UserGroup.query.options(joinedload(UserGroup.group)).filter(UserGroup.user_id == user_id).all()


    def group_to_dict(group):

        return {
            "id": group.id,
            "name": group.name,
            "type": group.type
        }

    all_groups = [group_to_dict(user_group.group) for user_group in user_groups]

    return {'Groups': all_groups}

# Get all Group Members by a Group's ID. (ERROR)
@group_routes.route('/<int:group_id>/members')
# @login_required
def get_all_group_members(group_id):
    """
    Get all Group Members by a Group's ID.
    """
    group = Group.query.get(group_id)

    # if(not group):
    #     return {"error": "Group couldn't be found."}, 404

    # group_members = UserGroup.query.options(joinedload(UserGroup.user)).filter(UserGroup.group_id == 1)
    group_members = UserGroup.query.options(joinedload(UserGroup.user)).filter(UserGroup.group_id == group_id).all()


    def group_members_to_dict(group_member):

        return {
            "id": group_member.id,
            "first_name": group_member.first_name,
            "last_name": group_member.last_name,
            "username": group_member.username,
            "nickname": group_member.nickname,
            "email": group_member.email
        }

    members = [group_members_to_dict(member.user) for member in group_members]

    return {'Members': members}

# Create a group.
@group_routes.route('', methods=['POST'])
@login_required
def index():
    """
    Create a group.
    """
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_group = Group(
            name = form.data['name'],
            type = form.data['type']
        )

        db.session.add(new_group)
        db.session.commit()

        user_id = current_user.id
        new_group_user = UserGroup(
            user_id = user_id,
            group_id = new_group.id
        )

        db.session.add(new_group_user)
        db.session.commit()

        def group_to_dict(group):

            return {
                "id": group.id,
                "name": group.name,
                "type": group.type
            }

        return group_to_dict(new_group)

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401




# Add user to group.
@group_routes.route('/<int:group_id>/members', methods=['POST'])
@login_required
def add_group_member(group_id):
    """
    Add user to a group.
    """
    form = AddGroupMemberForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # if True:
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.data['member_email'])

        if not user:
            return {"error": "User couldn't be found."}, 404

        user_id = user.id
        # user_id = 1
        new_group_user = UserGroup(
            user_id = user_id,
            group_id = group_id
        )

        db.session.add(new_group_user)
        db.session.commit()

        def edit_group_to_dict(added_user):

            return {
                "message": "User successfully added to group.",
                "group_id": added_user.group_id,
                "user_id": added_user.user_id
            }

        return edit_group_to_dict(new_group_user)


# Remove user to group.
# @group_routes.route('/<int:group_id>/members', methods=['DELETE'])
# @login_required
# def remove_group_member(group_id):


# Add an expense for a group.


#Edit a group.
@group_routes.route('/<int:group_id>', methods=['PUT'])
@login_required
def edit_group(group_id):
    """
    Edit a group.
    """
    group = Group.query.get(group_id)
    form = EditGroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(not group):
        return {"error": "Group couldn't be found."}, 404

    if form.validate_on_submit():
        group.name = form.data['name']
        group.type = form.data['type']

        db.session.commit()

        def edit_group_to_dict(group):

            return {
                "message": "Successfully updated group.",
                "name": group.name,
                "type": group.type
            }

        return edit_group_to_dict(group)

# Delete a group.
@group_routes.route('/<int:group_id>', methods=['DELETE'])
@login_required
def delete_group(group_id):
    """
    Delete a group.
    """
    group = Group.query.get(group_id)

    if(not group):
        return {"error": "Group couldn't be found."}, 404

    db.session.delete(group)
    db.session.commit()

    return {"message": "Successfully deleted."}
