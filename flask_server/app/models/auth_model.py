from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .. import db, login_manager


class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='role', lazy='dynamic')

    def __repr__(self):
        return '<Role %r>' % self.name

class Department(db.Model):
    __tablename__ = 'departments'
    id = db.Column(db.Integer, primary_key=True)
    departname = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='department', lazy='dynamic')

    def __repr__(self):
        return '<Department %r>' % self.name


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    #必须使用 id 字段，否则调用 login_user（）函数时会报错
    id = db.Column(db.Integer, primary_key=True,unique=True, index=True)
    username = db.Column(db.String(64))
    department_id = db.Column(db.Integer, db.ForeignKey('departments.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    password_hash = db.Column(db.String(128))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User %r>' % self.username


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))