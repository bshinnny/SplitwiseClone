from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user_groups import UserGroup

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(255), nullable=False)

    expense = db.relationship('Expense', back_populates='group', cascade='all,delete')
    user_group = db.relationship('UserGroup', back_populates='group', cascade='all,delete')
    # user = db.relationship('User', back_populates='groups')
