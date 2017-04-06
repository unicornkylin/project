#!/usr/bin/env python

from flask_script import Manager, Shell, Server
from flask_migrate import Migrate, MigrateCommand

from app import create_app, db
from app.models.auth_model import User, Role


app = create_app('default')

manager = Manager(app)
#运行 python mananger.py runserver时，命令参数use_debugger=True自动传入
manager.add_command("runserver", Server(use_debugger=True))

migrate = Migrate(app, db)

# def make_shell_context():
#     return dict(app=app, db=db, User=User, Role=Role)
# manager.add_command("shell", Shell(make_context=make_shell_context))
manager.add_command('db', MigrateCommand)


if __name__ == '__main__':
    manager.run( )
