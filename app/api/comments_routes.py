from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Expense, ExpenseComment, db
from sqlalchemy.orm import joinedload
from ..forms.comment_form import CommentForm
from .auth_routes import validation_errors_to_error_messages


comments_route = Blueprint('comments', __name__, url_prefix='/api')

@comments_route.route('/expenses/<int:expenseId>/comments', methods=['GET'])
@login_required
def get_comments(expenseId):
    expense = Expense.query.filter(Expense.id == expenseId)

    if expense:
        comments = ExpenseComment.query.options(joinedload(ExpenseComment.expense)).filter(ExpenseComment.expense_id == expenseId)
        return [comment.to_dict() for comment in comments ]

    return {'errors': f'Expense {expenseId} not found!'}, 404


@comments_route.route('/expenses/<int:expenseId>/comments', methods=['POST'])
@login_required
def create_comment(expenseId):
    expense = Expense.query.filter(Expense.id == expenseId)

    if expense:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            new_comment = ExpenseComment(
                user_id = current_user.id,
                expense_id = expenseId,
                description = form.data['discription'],
                date = form.data['date']
            )
            db.session.add(new_comment)
            db.commit()
            return new_comment.to_dict(), 200
        else:
            return {'errors': validation_errors_to_error_messages(form.errors)}, 400

    return {'errors': f'Expense {expenseId} not found!'}, 404


@comments_route('/comments/<int:commentId>', methods=['PUT'])
@login_required
def edit_comment(commentId):
    comment = ExpenseComment.query(ExpenseComment.id == commentId)

    if not comment:
        return {'errors': f'Comment {commentId} not found!'}, 404

    if comment.id != current_user.id:
        return {'errors': 'Unauthorized!'}, 400

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        comment.description = form.data['description'],
        comment.date = form.data['date']

        db.session.add(comment)
        db.session.commit()
        return comment.to_dict(), 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@comments_route('/comments/<int:commentId>', methods=['DELETE'])
@login_required
def delete_comment(commentId):
    comment = ExpenseComment.query(ExpenseComment.id == commentId)

    if not comment:
        return {'errors': f'Comment {commentId} not found!'}, 404

    if comment.id != current_user.id:
        return {'errors': 'Unauthorized!'}, 400

    db.session.delete(comment)
    db.session.commit()
    return {'message': f'Sucessfully deleted comment {comment.id}'}, 200
