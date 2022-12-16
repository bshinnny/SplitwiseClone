from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, ValidationError


def description_len_check(form, field):
    description = field.data
    if len(description) > 254:
        raise ValidationError("Description must be less than 255 characters")


class CommentForm(FlaskForm):
    description = StringField('Description:', [DataRequired(), description_len_check])
    date = DateField('Date')
