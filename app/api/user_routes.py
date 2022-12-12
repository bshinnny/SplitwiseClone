from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# get all friends # I tested it, this route works
@user_routes.route("/current")
@login_required
def get_all_friends():
    """
    Query for all friends of the current user and return the friends information
    """
    print("%%%%%%%%%%%%","hello")
    user_id = int(current_user.get_id())

    user = User.query.filter(User.id == user_id)
    friends = user.friends
    print('friends++++++++++', friends[1].id)
    return 'kkk'
