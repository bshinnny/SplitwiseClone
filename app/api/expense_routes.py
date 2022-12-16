from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Expense, Group
from sqlalchemy.orm import joinedload
from app.forms import ExpenseForm, UpdateExpenseForm
from .auth_routes import validation_errors_to_error_messages
from sqlalchemy import or_

expense_routes = Blueprint('expenses', __name__)

@expense_routes.route('/')
def test():
    return {'test': 'test'}

#return all of current user's expenses
@expense_routes.route('/current')
@login_required
def all_expenses_of_user():
    """
    Query for all expenses of the current user and return the expenses
    """
    user = User.query.get(current_user.id)
    user_id = current_user.get_id()

    fronted_expenses = Expense.query.options(joinedload(Expense.user)).options(joinedload(Expense.recipient)).filter(Expense.user_id == user_id).all()

    owe_others_expenses = Expense.query.options(joinedload(Expense.user)).options(joinedload(Expense.recipient)).filter(Expense.recipient_id == user_id).all()

    # all_expenses = Expense.query.options(joinedload(Expense.user)).options(joinedload(Expense.recipient)).filter(or_(Expense.user_id == user_id, Expense.recipient_id == user_id)).all()

    def fronted_expenses_to_dict(expense):

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
            "Recipient": {
                "first_name": expense.recipient.first_name,
                "last_name": expense.recipient.last_name,
                "nickname": expense.recipient.nickname,
                "id": expense.recipient.id
            },
            "Fronter": {
                "first_name": expense.user.first_name,
                "last_name": expense.user.last_name,
                "nickname": expense.user.nickname,
                "id": expense.user.id
            }
        }

    def owe_others_expenses_to_dict(expense):

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
                "nickname": expense.user.nickname,
                "id": expense.user.id
            },
                "Recipient": {
                "first_name": expense.recipient.first_name,
                "last_name": expense.recipient.last_name,
                "nickname": expense.recipient.nickname,
                "id": expense.recipient.id
            }
        }


    accounts_receivable = [fronted_expenses_to_dict(expense) for expense in fronted_expenses]
    accounts_payable = [owe_others_expenses_to_dict(expense) for expense in owe_others_expenses]
    # accounts_payable = [expense.to_dict() for expense in owe_others_expenses]


    return {'Receivable Expenses': accounts_receivable, 'Payable Expenses': accounts_payable}


@expense_routes.route("/<int:expense_id>")
@login_required
def get_one_expense(expense_id):

    id_of_user = current_user.id

    expense = Expense.query.options(joinedload(Expense.recipient)).options(joinedload(Expense.user)).filter(Expense.id == expense_id).first()
    print(expense, '------------------------')
    if(not expense):
        return {"errors": "Expense not found"}

    if not id_of_user == expense.user_id and not id_of_user == expense.recipient_id and not expense.group_id:
        return {'errors': "Not authorized to view this expense"}, 401


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



@expense_routes.route("", methods=["POST"])
@login_required
def create_expense():
    """
    Create a new Expense
    """
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    recipient_email = form.data["recipientEmail"]

    recipient_user = User.query.filter(User.email == recipient_email).first()

    if(not recipient_user):
        return {"errors": ["Recipient not found"]}, 404

    id_of_user = current_user.id #user is an integer

    if form.validate_on_submit():
        description = form.data["description"]
        user_id = id_of_user
        group_id = form.data["group_id"]
        recipient_id = recipient_user.id
        amount = form.data["amount"]
        note = form.data["note"]

        new_expense = Expense(description=description, user_id=user_id, group_id=group_id, recipient_id=recipient_id, amount=amount, note=note)

        db.session.add(new_expense)
        db.session.commit()

        return new_expense.to_dict()

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@expense_routes.route("/<int:expense_id>", methods=["PUT"])
@login_required
def update_expense(expense_id):
    """
    Update an expense
    """

    form = UpdateExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    id_of_user = current_user.id
    expense = Expense.query.get(expense_id) #if not found, expense will be None

    if not expense:
        return {'errors': "Expense not found"}, 404

    if not id_of_user == expense.user_id and not id_of_user == expense.recipient_id:
        return {'errors': "Not authorized to edit this expense"}, 401

    if expense and form.validate_on_submit():
        expense.description = form.data["description"]
        expense.amount = form.data["amount"]
        expense.note = form.data["note"]

        db.session.commit()

        expense_test = Expense.query.get(expense_id)
        return expense.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@expense_routes.route("/<int:expense_id>", methods=["DELETE"])
@login_required
def delete_expense(expense_id):
    """
    Delete an expense
    """
    expense = Expense.query.get(expense_id)

    id_of_user = current_user.id

    if not expense:
        return {'errors': "Expense not found"}, 404

    if not id_of_user == expense.user_id and not id_of_user == expense.recipient_id:
        return {'errors': "Not authorized to delete this expense"}, 401

    db.session.delete(expense)
    db.session.commit()

    return {"message": "Expense successfully deleted"}
