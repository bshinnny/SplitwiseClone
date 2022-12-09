from .db import db

class Expenses(db.Model):
    __tablename__ =  "expenses"
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer)
    group_id = db.Column(db.Integer)
    recipient_id = db.Column(db.Integer)
    amount = db.Column(db.Float)
    date = db.Column(db.Date)
    note = db.Column(db.String(255))
    status = db.Column(db.String(20))
