from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError

class GroupForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    member_1 = StringField('Member', validators=[DataRequired()])
    member_2 = StringField('Member')
    member_3 = StringField('Member')
    member_4 = StringField('Member')
    member_5 = StringField('Member')
    member_6 = StringField('Member')
    member_7 = StringField('Member')
    member_8 = StringField('Member')
    member_9 = StringField('Member')
    member_10 = StringField('Member')
    member_11 = StringField('Member')
    member_12 = StringField('Member')
    member_13 = StringField('Member')
    member_14 = StringField('Member')
    member_15 = StringField('Member')
    member_16 = StringField('Member')
    member_17 = StringField('Member')
    member_18 = StringField('Member')
    member_19 = StringField('Member')
    member_20 = StringField('Member')
    type = SelectField('Type', choices=[('Trip', 'Trip'), ('Home', 'Home')], validators=[DataRequired()])

class EditGroupForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=[('Trip', 'Trip'), ('Home', 'Home')], validators=[DataRequired()])
