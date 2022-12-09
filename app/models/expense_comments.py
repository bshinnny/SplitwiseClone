from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ExpenseComment(db.Model):
    __tablename__ = 'expense_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    expense_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.now())
