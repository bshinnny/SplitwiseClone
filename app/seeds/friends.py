from app.models import db, Friend, environment, SCHEMA

def seed_friends():
    friend1 = Friend(
        user_id = 1,
        friend_id = 2,
        status = "accepted",
        #date = "2022-10-06"
        #Date type only accepts date objects as input
    )

    friend2 = Friend(
        user_id = 3,
        friend_id =2,
        status = "accepted",
        # date = "2022-11-06"
    )

    friend3 = Friend(
        user_id = 4,
        friend_id =1,
        status = "pending",
        # date = "2021-07-09"
    )

    friend4 = Friend(
        user_id = 5,
        friend_id =3,
        status = "reject",
        # date = "2022-08-10"
    )

    friend5 = Friend(
        user_id = 7,
        friend_id =1,
        status = "accepted",
        # date = "2022-12-10"
    )

    friend6 = Friend(
        user_id = 1,
        friend_id =6,
        status = "accepted",
        # date = "2022-11-10"
    )

    friend7 = Friend(
        user_id = 2,
        friend_id =5,
        status = "accepted",
        # date = "2022-09-10"
    )

    db.session.add(friend1)
    db.session.add(friend2)
    db.session.add(friend3)
    db.session.add(friend4)
    db.session.add(friend5)
    db.session.add(friend6)
    db.session.add(friend7)
    db.session.commit()


def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM friends")

    db.session.commit()
