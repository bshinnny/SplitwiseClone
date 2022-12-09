from .db import db, environment, SCHEMA

class UserGroup(db.Model):
    __tablename__ = 'user_groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, nullable=False)
    group_id = db.Column(db.Integer, nullable=False)
