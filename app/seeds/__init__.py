from flask.cli import AppGroup
from .users_groups import seed_users_groups, undo_users_groups
# from .groups import seed_groups, undo_groups
from .expenses import seed_expenses, undo_expenses
from .comments import seed_comments, undo_comments


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users_groups()
        undo_expenses()
        undo_comments()
        # undo_friends()
    seed_users_groups()
    # Add other seed functions here
    # seed_friends()
    seed_expenses()
    seed_comments()
    # seed_usergroups()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users_groups()
    # Add other undo functions here
    # undo_friends()
    undo_comments()
    undo_expenses()
