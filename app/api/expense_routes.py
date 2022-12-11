from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Expense

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

    fronted_expenses = Expense.query.filter(Expense.user_id == user_id).all()

    owe_others_expenses = Expense.query.filter(Expense.recipient_id == user_id).all()

    # def to_dict(expense):
    #     return {

    #     }

    accounts_receivable = [expense.to_dict() for expense in fronted_expenses]
    accounts_payable = [expense.to_dict() for expense in owe_others_expenses]


    return {'Receivable Expenses': accounts_receivable, 'Payable Expenses': accounts_payable}
