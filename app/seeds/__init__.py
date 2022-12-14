from flask.cli import AppGroup
from .users import seed_users, undo_users, delete_test
from .groups import seed_groups, undo_groups
from .expenses import seed_expenses, undo_expenses
from .friends import seed_friends, undo_friends
from .user_groups import seed_user_groups, undo_user_groups
from .expense_comments import seed_expense_comments, undo_expense_comments
# from app.models import User


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`.
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command.
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below.
        undo_expense_comments()
        undo_user_groups()
        undo_expenses()
        undo_groups()
        undo_friends()
        undo_users()

    seed_users()
    # Add other seed functions here.
    seed_friends()
    seed_groups()
    seed_expenses()
    seed_user_groups()
    seed_expense_comments()
    # user = User.query.get(1)
    # db.session.delete(user)
    # db.session.commit()

@seed_commands.command('test')
def index():
    delete_test()

# Creates the `flask seed undo` command.
@seed_commands.command('undo')
def undo():
    undo_expense_comments()
    undo_user_groups()
    undo_expenses()
    undo_groups()
    undo_friends()
    undo_users()
