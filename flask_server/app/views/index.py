# -*- coding: utf-8 -*-
from flask import request, render_template, redirect, url_for

from . import index_bp

@index_bp.route('/')
@index_bp.route('/index')
def index():
    return 'Hello World!'