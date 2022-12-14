from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired


class CommentForm(FlaskForm):
    description = StringField('Description:', [DataRequired()])
    date = DateField('Date')
