from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError

class GroupForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=[('Home', 'Home'), ('Trip', 'Trip'), ('Couple', 'Couple'), ('Other', 'Other')], validators=[DataRequired()])

class EditGroupForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=[('Home', 'Home'), ('Trip', 'Trip'), ('Couple', 'Couple'), ('Other', 'Other')], validators=[DataRequired()])

class AddGroupMemberForm(FlaskForm):
    memberEmail = StringField('User Email', validators=[DataRequired()])
