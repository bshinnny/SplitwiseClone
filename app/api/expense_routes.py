from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

expense_routes = Blueprint('expenses', __name__)

@expense_routes.route('/')
def test():
    return {'test': 'test'}
