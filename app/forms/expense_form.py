from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError
from ..models.user import User
from ..models.groups import Group

def description_len_check(form, field):
    description = field.data
    if len(description) > 40:
        raise ValidationError("Description must be less than 40 characters")

def note_len_check(form, field):
    note = field.data
    if len(note) > 254:
        raise ValidationError("Note must be less than 255 characters")


def recipient_id_check(form, field):
    recipient_id = field.data
    recipient = User.query.filter(User.id == recipient_id).all()
    if len(recipient) == 0:
        raise ValidationError("Recipient not found")

def group_id_check(form, field):
    group_id = field.data
    if(group_id):
        group = Group.query.filter(Group.id == group_id).all()
        if len(group) == 0:
            raise ValidationError("Group not found")


class ExpenseForm(FlaskForm):
    description = StringField("Description", validators=[DataRequired(), description_len_check])
    user_id = IntegerField("User Id", validators=[DataRequired()])
    group_id = IntegerField("Group Id", validators=[group_id_check])
    recipient_id = IntegerField("Recipient Id")
    amount = FloatField("Amount", validators=[DataRequired()])
    date = DateField("Date")
    note = StringField("Note", validators=[note_len_check])
    status = BooleanField("Status")
    recipientEmail = StringField("Recipient Email", validators=[DataRequired()])


class UpdateExpenseForm(FlaskForm):
    description = StringField("Description", validators=[DataRequired(), description_len_check])
    amount = FloatField("Amount", validators=[DataRequired()])
    date = DateField("Date")
    note = StringField("Note", validators=[note_len_check])
    status = BooleanField("Status")

class GroupExpenseForm(FlaskForm):
    description = StringField("Description", validators=[DataRequired(), description_len_check])
    user_id = IntegerField("User Id")
    group_id = IntegerField("Group Id")
    recipient_id = IntegerField("Recipient Id")
    amount = FloatField("Amount", validators=[DataRequired()])
    date = DateField("Date")
    note = StringField("Note", validators=[note_len_check])
    status = BooleanField("Status")
