from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError

class GroupForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=[('Trip', 'Trip'), ('Home', 'Home')], validators=[DataRequired()])

class EditGroupForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=[('Trip', 'Trip'), ('Home', 'Home')], validators=[DataRequired()])

class AddGroupMemberForm(FlaskForm):
    member_email = StringField('User Email', validators=[DataRequired()])
