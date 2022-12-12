from app.models import db, UserGroup, SCHEMA, environment

def seed_user_groups():
    user_group1 = UserGroup(
        user_id = 1, group_id = 1
    )
    user_group2 = UserGroup(
        user_id = 1, group_id = 2
    )
    user_group3 = UserGroup(
        user_id = 2, group_id = 1
    )
    user_group4 = UserGroup(
        user_id = 2, group_id = 2
    )
    user_group5 = UserGroup(
        user_id = 3, group_id = 3
    )

    db.session.add(user_group1)
    db.session.add(user_group2)
    db.session.add(user_group3)
    db.session.add(user_group4)
    db.session.add(user_group5)
    db.session.commit()


def undo_user_groups():
    if environment == "production":
        # db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_groups RESTART IDENTITY CASCADE;")
    else:
        # db.session.execute("DELETE FROM groups")
        db.session.execute("DELETE FROM user_groups")

    db.session.commit()
