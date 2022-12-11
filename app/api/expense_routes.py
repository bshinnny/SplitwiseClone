from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Expense
from sqlalchemy.orm import joinedload

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
    print(user, 'userrrrrr')

    fronted_expenses = Expense.query.options(joinedload(Expense.recipient)).filter(Expense.user_id == user_id).all()

    owe_others_expenses = Expense.query.options(joinedload(Expense.user)).filter(Expense.recipient_id == user_id).all()


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
                "nickname": expense.recipient.nickname
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
                "nickname": expense.user.nickname
            }
        }

    accounts_receivable = [fronted_expenses_to_dict(expense) for expense in fronted_expenses]
    accounts_payable = [owe_others_expenses_to_dict(expense) for expense in owe_others_expenses]
    # accounts_payable = [expense.to_dict() for expense in owe_others_expenses]


    return {'Receivable Expenses': accounts_receivable, 'Payable Expenses': accounts_payable}


