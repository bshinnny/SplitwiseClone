from .db import db, environment, SCHEMA, add_prefix_for_prod

class Friend(db.Model):
    __tablename__ = 'friends'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    friend_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    status = db.Column(db.String(20), nullable=False)
    date = db.Column(db.Date, nullable=False)

    user = db.relationship('User', back_populates='friends_user', foreign_keys=[user_id])
    friend = db.relationship('User', back_populates='friends_friend', foreign_keys=[friend_id])
