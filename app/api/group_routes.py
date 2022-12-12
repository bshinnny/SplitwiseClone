from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Expense, Group
from sqlalchemy.orm import joinedload
from app.forms import ExpenseForm, UpdateExpenseForm
from .auth_routes import validation_errors_to_error_messages


group_routes = Blueprint('groups', __name__)

@group_routes.route('/<int:group_id>/expenses')
@login_required
def get_all_group_routes(group_id):
    """
    Return all expenses for a group based on the group's id
    """
    group = Group.query.get(group_id)

    group_expenses = Expense.query.options(joinedload(Expense.recipient)).options(joinedload(Expense.user)).filter(Expense.group_id == group_id)

    group_expenses_to_dict = [expense.to_dict() for expense in group_expenses]

    return {'test': group_expenses_to_dict}
