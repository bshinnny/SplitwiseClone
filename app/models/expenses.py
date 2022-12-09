from .db import db
from datetime import date

class Expense(db.Model):
    __tablename__ =  "expenses"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")))
    recipient_id = db.Column(db.Integer db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.now())
    note = db.Column(db.String(255))
    status = db.Column(db.Boolean, nullable=False, default=False)

    user = db.relationship('User', back_populates='expenses_user', foreign_keys=[user_id])
    recipient = db.relationship('User', back_populates='expenses_recipient', foreign_keys=[recipient_id])
    group = db.relationship('Group', back_populates='expense', foreign_keys=[group_id])
    comment = db.relationship('ExpenseComment', back_populates='expense', cascade='all, delete-orphan')
