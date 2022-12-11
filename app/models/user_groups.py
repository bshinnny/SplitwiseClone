from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserGroup(db.Model):
    __tablename__ = 'user_groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), nullable=False)

    group = db.relationship('Group', back_populates='user_group', foreign_keys=[group_id])
    user = db.relationship('User', back_populates='user_group', foreign_keys=[user_id])
