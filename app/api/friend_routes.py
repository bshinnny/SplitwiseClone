from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User,Friend, Expense, ExpenseComment, db
from sqlalchemy.orm import joinedload
from ..forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages


friends_routes = Blueprint("friends",__name__)


@friends_routes.route('/')
def test():
    return {'test_friend_routes': 'test'}

# get all friends 
@friends_routes.route("/current")
@login_required
def get_all_friends():
    """
    Query for all friends of the current user and return the friends information
    """

    user_id = int(current_user.get_id())
    friendships1 = Friend.query.filter(Friend.user_id == user_id).all()
    friendships2 = Friend.query.filter (Friend.friend_id == user_id).all()
    friendships = friendships1 + friendships2

    friends_ids = set()
    for friendship in friendships:
        if friendship.user_id != user_id:
            friends_ids.add(friendship.user_id)
        if friendship.friend_id != user_id:
            friends_ids.add(friendship.friend_id)

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
    
    if len(friends_lst) == 0:
        return {"message":"You currently don't have any friend yet"},404

    return {"currentUserFriends": friends_lst}






# get details of Friend from id
@friends_routes.route("/<int:friend_id>")
@login_required
def get_friend_detail(friend_id):

    friend_id = friend_id

    current_user_id = int(current_user.get_id())



    friendship = Friend.query.filter((Friend.user_id == current_user_id),(Friend.friend_id == friend_id)).all()


    if len(friendship) == 0:
        return {"message": "Friend couldn't be found"},404
    

    friend = User.query.filter(User.id == friend_id).one()

    expense1 = Expense.query.filter(Expense.user_id== friend_id).all()
    expense2 = Expense.query.filter(Expense.recipient_id== friend_id).all()
    expenses = expense1 + expense2

    
    expense_list =[]
    
    for expense in expenses:
        dict ={
        "id": expense.id,
        "description": expense.description,
        "user_id": expense.user_id,
        "group_id": expense.group_id,
        "recipient_id": expense.recipient_id,
        "amount": expense.amount,
        "date": expense.date,
        "notes": expense.note,
        "status": expense.status  
        }
        expense_list.append(dict)


    return {
        "id":friend.id,
        "first_name": friend.first_name,
        "last_name": friend.last_name,
        "username": friend.username,
        "nickname": friend.nickname,
        "email": friend.email,
        "createdAt": friend.created_at,
        "updatedAt": friend.updated_at,
        "shared_expenses":expense_list
    }





# create a friend
@friends_routes.route('/', methods=["POST"])
@login_required
def create_friendship():
    """
    Create(add) a new friend
    """
    req = request.json
    friend_email = req.get("email")
    friend_id = int(req.get('friend_id'))
    curr_user_id = int(current_user.get_id())

    # validation: can not friend yourself
    if friend_id == curr_user_id:
        return {"error": "Can not add yourself as a friend"}, 400

    friend = User.query.get(friend_id)

    # validation: friend_id not found
    if friend == None:
        return {"error": "User not found"}, 404

    # get current user friends
    friendships1 = Friend.query.filter(Friend.user_id == curr_user_id).all()
    friendships2 = Friend.query.filter (Friend.friend_id == curr_user_id).all()
    friendships = friendships1 + friendships2
    friends_ids = set()
    for friendship in friendships:
        if friendship.user_id != curr_user_id:
            friends_ids.add(friendship.user_id)
        if friendship.friend_id != curr_user_id:
            friends_ids.add(friendship.friend_id)


    # validation: check if already friends
    if friend_id in friends_ids:
        return {"error": "You are already friends with this user"}, 400

    new_friendship = Friend(
        user_id = curr_user_id,
        friend_id = friend_id,
        status = "pending"
    )

    db.session.add(new_friendship)
    db.session.commit()

    return { "friend_id": friend_id, "email": friend_email, "user_id":curr_user_id },201






# delete a friend
@friends_routes.route("/<int:friend_id>", methods=["DELETE"])
@login_required
def delete_friendship(friend_id):
    """
    Delete friendship 
    """
    req = request.json
    friend_id = int(req.get('friend_id'))
    current_user_id = int(current_user.get_id())

    # friend_id = 1
    # current_user_id = 1
    # validation: can not friend yourself
    if friend_id == current_user_id:
        return {"error": "Can not add or delete yourself as a friend"}, 400

    friend = User.query.get(friend_id)

    # validation: friend_id not found
    if friend == None:
        return {"error": "Friend not found"}, 404

    # find friendship
    friendships1 = Friend.query.filter(Friend.user_id == current_user_id).all()
    friendships2 = Friend.query.filter (Friend.friend_id == friend_id).all()
    friendshipA = friendships1 + friendships2
    friendships3 = Friend.query.filter(Friend.user_id == friend_id).all()
    friendships4 = Friend.query.filter (Friend.friend_id == current_user_id).all()
    friendshipB = friendships3 + friendships4
    # freindshipA = Friend.query.filter((Friend.user1_id == current_user_id, Friend.user2_id == friend_id)).all()
    # freindshipB = Friend.query.filter((Friend.user2_id == current_user_id, Friend.user1_id == friend_id)).all()



    if len(friendshipA) == 0 and len(friendshipB) == 0 :
        return {"error": "You are not friends with this user"}, 400

    for friendship in friendshipA:
        db.session.delete(friendship)
        db.session.commit()

    for friendship in friendshipB:
        db.session.delete(friendship)
        db.session.commit()

    return {"message": "Friend Successfully deleted"}