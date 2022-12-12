from app.models import db, User, Group, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users_groups():
    demo = User(
        username='demo', email='demo@aa.io', password='password', first_name="Demo", last_name="Lition", nickname="demo-lition"
    )
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="Marnie", last_name="Mo", nickname="mM"
    )
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="Bobbie", last_name="Bob", nickname="bB"
    )
    adam = User(
        first_name="Adam", last_name="Adams", username="adamAdams", nickname="aA", email="adam@adams.com", password="password"
    )
    brain = User(
        first_name="Brian", last_name="Brians", username="brianBrians", nickname="bB", email="brian@brians.com", password="password"
    )
    charlie = User(
        first_name="Charlie", last_name="Charlies", username="charlieCharlies", nickname="cC", email="charlie@charlies.com", password="password"
    )
    don = User(
        first_name="Don", last_name='Dons', username='donDons', nickname="dD", email="don@dons.com", password="password"
    )
    demo.friends = [marnie, bobbie, adam, brain, charlie, don]
    marnie.friends = [demo, bobbie, adam, brain, charlie, don]
    bobbie.friends = [marnie, demo, adam, brain, charlie, don]
    adam.friends = [marnie, bobbie, demo, brain, charlie, don]
    brain.friends = [marnie, bobbie, adam, demo, charlie, don]
    charlie.friends = [marnie, bobbie, adam, brain, demo, don]
    don.friends = [marnie, bobbie, adam, brain, charlie, demo]


    group1 = Group(
        name = 'Bosses', type = 'Trip'
    )
    group2 = Group(
        name = 'Champions', type = 'Trip'
    )
    group3 = Group(
        name = 'All Stars', type = 'Home'
    )
    group4 = Group(
        name = 'Family Forever', type = 'Couple'
    )
    group5 = Group(
        name = 'The Nerd Herd', type = 'Other'
    )

    demo.groups = [group1, group2, group3]
    marnie.groups = [group2, group3, group4]
    bobbie.groups = [group3, group4, group5]
    adam.groups = [group1, group2]
    brain.groups = [group3, group4]
    charlie.groups = [group5, group1]
    don.groups = [group2, group3, group4]

    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.add(group4)
    db.session.add(group5)

    all_users = [demo, marnie, bobbie, adam, brain, charlie, don]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()

    # user_seeds = [
    #     {"first_name": "Adam", "last_name": "Adams", "username": "adamAdams", "nickname": "aA", "email": "adam@adams.com", "hashed_password": "password"},
    #     {"first_name": "Brian", "last_name": "Brians", "username": "brianBrians", "nickname": "bB", "email": "brian@brians.com", "hashed_password": "password"},
    #     {"first_name": "Charlie", "last_name": "Charlies", "username": "charlieCharlies", "nickname": "cC", "email": "charlie@charlies.com", "hashed_password": "password"},
    #     {"first_name": "Don", "last_name": "Dons", "username": "donDons", "nickname": "dD", "email": "don@dons.com", "hashed_password": "password"},
    #     {"first_name": "Edward", "last_name": "Edwards", "username": "edwardEdwards", "nickname": "eE", "email": "edward@edwards.com", "hashed_password": "password"},
    #     {"first_name": "Finn", "last_name": "Finns", "username": "finnFinns", "nickname": "fF", "email": "finn@finns.com", "hashed_password": "password"},
    #     {"first_name": "George", "last_name": "Georges", "username": "georgeGeorges", "nickname": "gG", "email": "george@georges.com", "hashed_password": "password"},
    #     {"first_name": "Henry", "last_name": "Henrys", "username": "henryHenrys", "nickname": "hH", "email": "henry@henrys.com", "hashed_password": "password"}
    #     ]

    # for user in user_seeds:
    #     data = User(first_name=user["first_name"], last_name=user["last_name"], username=user["username"], nickname=user["nickname"], email=user["email"], password=user["hashed_password"])

    #     db.session.add(data)



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")

    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM groups")

    db.session.commit()
