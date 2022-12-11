from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class ExpenseComment(db.Model):
    __tablename__ = 'expense_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('expenses.id')), nullable=False)
    description = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=date.today())

    user = db.relationship('User', back_populates='comment', foreign_keys=[user_id])
    expense = db.relationship('Expense', back_populates='comment', foreign_keys=[expense_id])

    def to_dict(self):
        return {
            'id': self.id,
            "user_id": self.user_id,
            "expense_id": self.expense_id,
            'date': self.date,
            'description': self.description
        }
