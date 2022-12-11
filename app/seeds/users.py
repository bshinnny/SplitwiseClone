from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name="Lition", nickname="demo-lition")
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="Marnie", last_name="Mo", nickname="mM")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="Bobbie", last_name="Bob", nickname="bB")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    user_seeds = [
        {"first_name": "Adam", "last_name": "Adams", "username": "adamAdams", "nickname": "aA", "email": "adam@adams.com", "hashed_password": "password"},
        {"first_name": "Brian", "last_name": "Brians", "username": "brianBrians", "nickname": "bB", "email": "brian@brians.com", "hashed_password": "password"},
        {"first_name": "Charlie", "last_name": "Charlies", "username": "charlieCharlies", "nickname": "cC", "email": "charlie@charlies.com", "hashed_password": "password"},
        {"first_name": "Don", "last_name": "Dons", "username": "donDons", "nickname": "dD", "email": "don@dons.com", "hashed_password": "password"},
        {"first_name": "Edward", "last_name": "Edwards", "username": "edwardEdwards", "nickname": "eE", "email": "edward@edwards.com", "hashed_password": "password"},
        {"first_name": "Finn", "last_name": "Finns", "username": "finnFinns", "nickname": "fF", "email": "finn@finns.com", "hashed_password": "password"},
        {"first_name": "George", "last_name": "Georges", "username": "georgeGeorges", "nickname": "gG", "email": "george@georges.com", "hashed_password": "password"},
        {"first_name": "Henry", "last_name": "Henrys", "username": "henryHenrys", "nickname": "hH", "email": "henry@henrys.com", "hashed_password": "password"}
        ]

    for user in user_seeds:
        data = User(first_name=user["first_name"], last_name=user["last_name"], username=user["username"], nickname=user["nickname"], email=user["email"], password=user["hashed_password"])

        db.session.add(data)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
