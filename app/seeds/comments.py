from app.models import db, ExpenseComment, environment, SCHEMA


def seed_comments():
    comment1 = ExpenseComment(
        user_id = 1,
        expense_id = 2,
        date = "2022-10-06",
        #Date type only accepts date objects as input
        description = 'Thanks, buddy!'
    )

    comment2 = ExpenseComment(
        user_id = 1,
        expense_id = 3,
        date = "2022-11-06",
        description = 'That\'s very kind of you!'
    )

    comment3 = ExpenseComment(
        user_id = 2,
        expense_id = 1,
        date = "2021-07-09",
        description = 'The food was very delicious!'
    )

    comment4 = ExpenseComment(
        user_id = 2,
        expense_id = 3,
        date = "2022-08-10",
        description = 'I hope we can be there again!'
    )

    comment5 = ExpenseComment(
        user_id = 3,
        expense_id = 1,
        date = "2022-03-10",
        description = 'I enjoyed this vacation.'
    )

    comment6 = ExpenseComment(
        user_id = 4,
        expense_id = 5,
        date = "2022-07-08",
        description = 'That\'s a very intresting trip!'
    )

    comment7 = ExpenseComment(
        user_id = 5,
        expense_id = 4,
        date = "2022-12-12",
        description = 'I love this vacation!'
    )

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expense_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM expense_comments")

    db.session.commit()
