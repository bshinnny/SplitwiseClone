from app.models import db, ExpenseComment, environment, SCHEMA

def seed_expense_comments():
    comment_1 = ExpenseComment(
        user_id = 1, expense_id = 1, description = 'Great expense!'
    )
    comment_2 = ExpenseComment(
        user_id = 2, expense_id = 2, description = 'Great trip!'
    )

    comment_3 = ExpenseComment(
        user_id = 1, expense_id = 3, description = 'Awesome!'
    )

    comment_4 = ExpenseComment(
        user_id = 2, expense_id = 3, description = 'Great!'
    )

    comment_5 = ExpenseComment(
        user_id = 3, expense_id = 1, description = 'Not bad.'
    )

    comment_6 = ExpenseComment(
        user_id = 3, expense_id = 2, description = 'Not bad.'
    )

    comment_7 = ExpenseComment(
        user_id = 4, expense_id = 4, description = 'Not bad.'
    )

    comment_8 = ExpenseComment(
        user_id = 3, expense_id = 5, description = 'Not bad.'
    )

    comment_9 = ExpenseComment(
        user_id = 7, expense_id = 6, description = 'Not bad.'
    )

    comment_10 = ExpenseComment(
        user_id = 6, expense_id = 7, description = 'Not bad.'
    )

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.commit()

def undo_expense_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expense_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM expense_comments")

    db.session.commit()
