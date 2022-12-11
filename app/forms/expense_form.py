from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from ..models.user import User


def recipient_id_check(form, field):
    recipient_id = field.data
    recipient = User.query.filter(User.id == recipient_id).all()
    print(recipient, 'plzzzzzzzzzz')
    if len(recipient) == 0:
        raise ValidationError("Recipient not found")


class ExpenseForm(FlaskForm):
    description = StringField("Description", validators=[DataRequired()])
    user_id = IntegerField("User Id", validators=[DataRequired()])
    group_id = IntegerField("Group Id")
    recipient_id = IntegerField("Recipient Id", validators=[DataRequired(), recipient_id_check])
    amount = FloatField("Amount", validators=[DataRequired()])
    date = DateField("Date")
    note = StringField("Note")
    status = BooleanField("Status")
