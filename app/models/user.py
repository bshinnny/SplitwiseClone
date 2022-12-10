from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    nickname = db.Column(db.String(50), nullable=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default = db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    friends_user = db.relationship('Friend', primaryjoin='User.id == Friend.user_id', back_populates='user', cascade='all, delete-orphan')
    friends_friend = db.relationship('Friend', primaryjoin='User.id == Friend.friend_id', back_populates='friend', cascade='all, delete-orphan')
    expenses_user = db.relationship('Expense', primaryjoin='User.id == Expense.user_id', back_populates='user', cascade='all, delete-orphan')
    expenses_recipient = db.relationship('Expense', primaryjoin='User.id == Expense.recipient_id', back_populates='recipient', cascade='all, delete-orphan')
    comment = db.relationship('ExpenseComment', back_populates='user', cascade='all, delete-orphan')
    user_group = db.relationship('UserGroup', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
