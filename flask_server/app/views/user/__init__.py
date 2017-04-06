from flask import Blueprint



# ###############################

login_bp = Blueprint('login', __name__)

from . import login

###################################

signup_bp = Blueprint('register', __name__)

from . import signup