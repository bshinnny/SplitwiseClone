from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User,Friend, Expense, ExpenseComment, db
from sqlalchemy.orm import joinedload
from ..forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages


friends_routes = Blueprint("friends",__name__)


@friends_routes.route('/')
def test():
    print(")))))))))))))))))))))))))","this is a test route")
    return {'test_friend_routes': 'test'}

# get all friends # I tested it, this route works
@friends_routes.route("/current")
# @login_required
def get_all_friends():
    """
    Query for all friends of the current user and return the friends information
    """
    print("%%%%%%%%%%%%","hello")
    # user_id = int(current_user.get_id())
    user_id = 1
    print("++++++",user_id)
    freindships1 = Friend.query.filter(Friend.user_id == user_id).all()
    freindships2 = Friend.query.filter (Friend.friend_id == user_id).all()
    freindships = freindships1 + freindships2
    print("=============",freindships)
    friends_ids = set()
    for freindship in freindships:
        if freindship.user_id != user_id:
            friends_ids.add(freindship.user_id)
        if freindship.friend_id != user_id:
            friends_ids.add(freindship.friend_id)

    friends = User.query.filter(User.id.in_(friends_ids)).all()

    friends_lst = []
    for friend in friends:
        friend_dict = {
            "id": friend.id,
            "first_name":friend.first_name,
            "last_name":friend.last_name,
            "username": friend.username,
            "nickname":friend.nickname,
            "email":friend.email,
            "createdAt":friend.created_at,
            "updatedAt":friend.updated_at
        }
        friends_lst.append(friend_dict)

    return {"currUserFriends": friends_lst}



# get details of Friend from id



# create a friend
@friends_routes.route('/', methods=["POST"])
@login_required
def create_friendship():
    """
    Create(add) a new friend
    """
    req = request.json
    friend_id = int(req.get('friend_id'))
    curr_user_id = int(current_user.get_id())

    # validation: can not friend yourself
    if friend_id == curr_user_id:
        return {"error": "Can not add yourself as a friend"}, 400

    friend = User.query.get(friend_id)

    # validation: friend_id not found
    if friend == None:
        return {"error": "User not found"}, 404

    # get curr user friends
    freindships = Friend.query.filter((Friend.user_id == curr_user_id) or(Friend.friend_id == curr_user_id)).all()
    friends_ids = set()
    for freindship in freindships:
        if freindship.user_id != curr_user_id:
            friends_ids.add(freindship.user_id)
        if freindship.friend_id != curr_user_id:
            friends_ids.add(freindship.friend_id)

    # validation: check if already friends
    if friend_id in friends_ids:
        return {"error": "You are already friends with this user"}, 400

    new_friendship = Friend(
        user_id = curr_user_id,
        friend_id = friend_id
    )

    db.session.add(new_friendship)
    db.session.commit()

    return { "id": friend.id, "username": friend.username },201




# delete a friend
@friends_routes.delete('')
# @login_required
def delete_friendship():
    """
    Delete friendship 
    """
    # req = request.json
    # friend_id = int(req.get('friend_id'))
    # curr_user_id = int(current_user.get_id())

    friend_id = 1
    current_user_id = 1
    # validation: can not friend yourself
    if friend_id == current_user_id:
        return {"error": "Can not add or delete yourself as a friend"}, 400

    friend = User.query.get(friend_id)

    # validation: friend_id not found
    if friend == None:
        return {"error": "Friend not found"}, 404

    # find friendship
    freindshipA = Friend.query.filter((Friend.user1_id == current_user_id, Friend.user2_id == friend_id)).all()
    freindshipB = Friend.query.filter((Friend.user2_id == current_user_id, Friend.user1_id == friend_id)).all()

    print('=========================', freindshipB)

    if len(freindshipA) == 0 and len(freindshipB) == 0 :
        return {"error": "You are not friends with this user"}, 400

    for friendship in freindshipA:
        db.session.delete(friendship)
        db.session.commit()

    for friendship in freindshipB:
        db.session.delete(friendship)
        db.session.commit()

    return {"message": "Expense Successfully deleted"}