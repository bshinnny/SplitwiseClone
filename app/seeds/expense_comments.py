from app.models import db, ExpenseComment, environment, SCHEMA

def seed_expense_comments():
    comment_1 = ExpenseComment(
        user_id = 1, expense_id = 1, description = 'Great expense!'
    )

    db.session.add(comment_1)
    db.session.commit()

def undo_expense_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expense_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM expense_comments")

    db.session.commit()