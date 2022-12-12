from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class Expense(db.Model):
    __tablename__ =  "expenses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"), ondelete='cascade'), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")))
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today())
    note = db.Column(db.String(255))
    status = db.Column(db.Boolean, nullable=False, default=False)

    user = db.relationship('User', back_populates='expenses_user',  foreign_keys=[user_id] )
    recipient = db.relationship('User', back_populates='expenses_recipient',  foreign_keys=[recipient_id])
    group = db.relationship('Group', back_populates='expense')
    comment = db.relationship('ExpenseComment', back_populates='expense', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "user_id": self.user_id,
            "group_id": self.group_id,
            "recipient_id": self.recipient_id,
            "amount": self.amount,
            "date": self.date,
            "note": self.note,
            "status": self.status
        }
