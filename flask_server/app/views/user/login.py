# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
from wtforms import StringField,IntegerField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, EqualTo, Email, Regexp, Length
from flask import request, Response, make_response

from flask_login import login_user, logout_user, login_required, \
    current_user


from . import login_bp      #Blueprint

from app.models.auth_model import User


@login_bp.route("/", methods=['POST', 'GET'])
def login():
    user = User.query.filter_by(id = request.form['userId']).first()
    if user is None:
        response = make_response(('该工号还未注册，请确认！', 5))
        return response
    else:
        if user.verify_password(request.form['userPassword']):
            response = make_response(('登录成功。'))
            return response
        else:
            response = make_response(('登陆密码错误。', 5))
            return response



class LoginForm(FlaskForm):
    userid = StringField(label=u'工号', validators=[DataRequired()])
    password = PasswordField(label=u'密码', validators=[DataRequired()])
    remember_me = BooleanField(label='Keep me logged in')
    submit = SubmitField(label=u'提交')



class MyTestForm(FlaskForm):
        name = StringField('name', validators=[DataRequired()])
