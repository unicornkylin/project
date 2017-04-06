from flask import Flask
from flask_bootstrap import Bootstrap
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

from config import config

# from flask_nav import Nav
# from flask_nav.elements import *



bootstrap = Bootstrap( )
db = SQLAlchemy()

login_manager = LoginManager()
login_manager.session_protection = 'strong'
login_manager.login_view = 'login.login'


# app.config.from_pyfile('config')



def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)

    bootstrap.init_app(app)
    db.init_app(app)
    login_manager.init_app(app)

    # mail.init_app(app)
    # moment.init_app(app)
    # db.init_app(app)
    # 附加路由和自定义的错误页面 return app
    # app.run(debug=True)


    from app.views import index_bp as index_bluprint
    app.register_blueprint(index_bluprint, url_prefix='/')
    app.register_blueprint(index_bluprint, url_prefix='/index')

    from app.views.user import login_bp as login_blueprint
    app.register_blueprint(login_blueprint, url_prefix='/login')

    from app.views.user import signup_bp as signup_blueprint
    app.register_blueprint(signup_blueprint, url_prefix='/signup')

    app.secret_key = 'some_secret'

    return app
