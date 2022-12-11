from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import Table

# class UserGroup(db.Model):
#     __tablename__ = 'user_groups'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     # id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True)
#     group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), primary_key=True)

#     # group = db.relationship('Group', back_populates='user_group', foreign_keys=[group_id])
#     # user = db.relationship('User', back_populates='user_group', foreign_keys=[user_id])


UserGroup = db.Table(
    "user_groups",
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')), primary_key=True)


    # if environment == "production":
    # __table_args__ = {'schema': SCHEMA}

)
