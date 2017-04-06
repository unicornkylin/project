# -*- coding: utf-8 -*-
from flask_wtf import FlaskForm
import pandas as pd
import json
# from flask_wtf import Form
from wtforms import StringField,IntegerField,SelectField, PasswordField, SubmitField
from wtforms.ext.sqlalchemy.fields import QuerySelectField

from wtforms.validators import required, DataRequired, EqualTo, Email, Regexp, Length, ValidationError

from flask import request, Response, make_response

from . import signup_bp     #Blueprint

from app import db

#数据库表在工程中，必须导入一次，否则，数据库迁移时，不会生成数据库表
from app.models.auth_model import User, Role, Department


WTF_CSRF_SECRET_KEY = 'a random string'


@signup_bp.route('/userid_check/', methods=['GET'])
def userid_check():
    print(request.args['userId'])
    if User.query.filter_by(id=request.args['userId']).first():
        # reponse = Response(
        #     response='该工号已注册',
        #     status=201,
        #     mimetype="application/json"
        # )
        response = make_response( "该工号已注册。", 5 )
        return reponse

    # reponse = Response(
    #     status=200,
    #     mimetype="application/json"
    # )
    response = make_response( "该工号可使用" )
    return response


@signup_bp.route('/username_check/', methods=['GET'])
def username_check():
    if User.query.filter_by(username=request.args['userName']).first():
        # reponse = Response(
        #     response='该姓名已注册',
        #     status=201,
        #     mimetype="application/json"
        # )
        # time.sleep(5)
        response = make_response( '该姓名已注册。', 5 )
        return response

    # reponse = Response(
    #     status=200,
    #     mimetype="application/json"
    # )
    # time.sleep(5)
    response = make_response('该姓名可使用。', 5)
    return response





@signup_bp.route('/department', methods=['POST', 'GET'])
def department():
    # make_response(jsonify({'error': 'Bad Request'}), 400)

   departmets =  [ a.departname for a in Department.query.all() ]
   result = json.dumps(departmets)
   reponse = Response(
       response=result,
       status=200,
       mimetype="application/json"
   )
   # time.sleep(5)
   return reponse


@signup_bp.route("/", methods=['POST', 'GET'])
def register():

    print(request.form)

    user = User(
        # id = request.args['userId'],              #GET方法使用 request.args
        # username = request.args['userName'],
        # department_id=request.args['department'],
        # role_id=1,
        # password=request.args['userPassword']
        id = request.form['userId'],                #POST方法使用 request.form
        username = request.form['userName'],
        department_id=request.form['department'],
        role_id=1,
        password=request.form['userPassword']
    )
    try:
        db.session.add(user)
        db.session.commit()
    except:
        response = make_response('注册失败。', 5)
        return response

    # response = Response(
    #     status=200,
    #     mimetype="application/json"
    # )
    # time.sleep(5)
    response = make_response( '注册成功。' )
    return response

class RegistrationForm(FlaskForm):

    # def query_factory( ):
    #     return [r.departname for r in db.session.query(Department).all()]
    #
    # def get_pk(obj):
    #     return obj

    userid = StringField(u'工号', validators=[DataRequired("工号必须由为4位数字组成"),
                                             Length(min=4, max=4, message='工号必须为0-9之间的4位数字'),
                                            Regexp('^[0-9]', 0,
                                                   u'工号必须由为4位数字组成')
                                            ])

    username = StringField(u'姓名', validators=[DataRequired(),
                                                   Length(1, 64)])

    department = SelectField(u'部门',coerce=int)
    #点击按钮时，实时查询数据库更新
    # department = QuerySelectField(u'部门', validators = [DataRequired()],
    #                                 query_factory = lambda: Department.query.order_by('departname'),
    #                                 get_pk=lambda a: a.id,
    #                                 get_label=lambda a: a.departname)

    password = PasswordField(u'密码', validators=[DataRequired(),
                                                     EqualTo('password2', message=u'密码必须一至')])

    password2 = PasswordField(u'确认密码', validators=[DataRequired()])

    submit = SubmitField(u'马上注册')

    def __init__(self, *args, **kwargs):
        super(RegistrationForm, self).__init__( *args, **kwargs)
        option_disable = [(0, "部门")]
        option_items = [(obj.id, obj.departname) for obj in Department.query.order_by('departname')]
        items = option_disable + option_items

        self.department.choices = items


    def validate_department(self, field):
        if field.data == 0:
            raise ValidationError('请选择部门')

    def validate_userid(self, field):
        if User.query.filter_by(userid=field.data).first():
            raise ValidationError('Username already in use.')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Username already in use.')

'''
#自定义校验方法，使用validate_fieldName(self,field),如下
    def validate_userid(self,field):
        if len(field.data) < 4:
            raise ValidationError('name exists')
'''
