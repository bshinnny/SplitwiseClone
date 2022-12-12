from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Expense, Group, UserGroup
from sqlalchemy.orm import joinedload
from app.forms import ExpenseForm, UpdateExpenseForm, GroupForm, EditGroupForm, GroupExpenseForm
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
# @group_routes.route('', methods=['POST'])
# @login_required
# def index():
#     """
#     Create a group.
#     """
#     form = GroupForm()
#     if form.validate_on_submit():
#         new_group = Group(
#             name = form.data['name'],
#             type = form.data['type']
#         )
#         # Need to check if that member exists.
#         for i in range(1,21):
#             if form.data[f'member_{i}']:
#                 new_member = UserGroup(
#                     user_id =,
#                     group_id=,
#                 )

# Add user to group.
# @group_routes.route('/<int:group_id>/members', methods=['POST'])
# @login_required
# def add_group_member(group_id):
#     pass


# Remove user to group.
# @group_routes.route('/<int:group_id>/members', methods=['DELETE'])
# @login_required
# def remove_group_member(group_id):
#     pass

# Add an expense for a group.
#FRONTEND - provide user_id and recipient id as current user
@group_routes.route('/<int:group_id>/expenses', methods=["POST"])
@login_required
def add_group_expense(group_id):

    id_of_user = current_user.id

    group = Group.query.get(group_id)

    if(not group):
        return {"error": "Group not found"}, 404

    group_members = UserGroup.query.options(joinedload(UserGroup.user)).filter(UserGroup.group_id == group_id).all()

    print(group_members, 'group members')

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

    def create_expense_splits(total_amount):
        number_of_members = len(members)

        temp = (total_amount * 100) % number_of_members
        remainder = temp / 100

        return remainder

    form = GroupExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():


        amount = (form.data["amount"] * 100) // len(members)
        amount_each_before_remainder = amount / 100

        print(amount_each_before_remainder, 'ONE TIME')

        remainder = create_expense_splits(form.data["amount"])
        all_new_expenses = []

        for member in members:

            if not remainder == 0:
                description = form.data["description"]
                user_id = id_of_user
                group_id = group_id
                recipient_id = member["id"]
                amount = round(amount_each_before_remainder + 0.01, 2)
                note = form.data["note"]

                remainder -= 0.01

                if user_id == recipient_id:
                    continue

                new_expense = Expense(description=description, user_id=user_id, group_id=group_id, recipient_id=recipient_id, amount=amount, note=note)

                db.session.add(new_expense)
                db.session.commit()
                all_new_expenses.append(new_expense.to_dict())

            else:
                description = form.data["description"]
                user_id = id_of_user
                group_id = group_id
                recipient_id = member["id"]
                amount = amount_each_before_remainder
                note = form.data["note"]

                if user_id == recipient_id:
                    continue

                new_expense = Expense(description=description, user_id=user_id, group_id=group_id, recipient_id=recipient_id, amount=amount, note=note)


                db.session.add(new_expense)
                db.session.commit()
                all_new_expenses.append(new_expense.to_dict())

        return {'Created Expenses': all_new_expenses }

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401





# Edit a group.
# @group_routes.route('/<int:group_id>', methods=['DELETE'])
# @login_required
# def index(group_id):
#     """
#     Edit a group.
#     """
#     group = Group.query.get(group_id)
#     form = EditGroupForm()

#     if(not group):
#         return {"error": "Group couldn't be found."}, 404

#     if form.validate_on_submit():
#         group.name = form.data['name']
#         group.type = form.data['type']

#         db.session.commit()

#         def edit_group_to_dict(group_member):

#             return {
#                 "message": "Successfully updated group.",
#                 "name": group_member.first_name,
#                 "type": group_member.last_name
#             }
