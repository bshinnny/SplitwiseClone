from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User

with app.app_context():
    db.drop_all()
    db.create_all()

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
        user = User(first_name=user_seeds["first_name"], last_name=user_seeds["last_name"], user_name=user_seeds["username"], nickname=user_seeds["nickname"], email=user_seeds["email"], hashed_password=user_seeds["hashed_password"])

        db.session.add(user)


    db.session.commit()

    