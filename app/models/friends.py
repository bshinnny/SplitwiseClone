from .db import db, environment, SCHEMA, add_prefix_for_prod

class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    date = db.Column(db.String(255))

    user = db.relationship('User', back_populates='friends_user')
    friend = db.relationship('User', back_populates='friends_friend')
