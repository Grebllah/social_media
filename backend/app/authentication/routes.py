from app import app
from app.utils import *
from app.authentication.models import User

from flask import request

@app.route('/register', methods = ["GET", "POST"])
def register():
    message = request.get_json()
    email, username, password = message.values()['loginDetails']
    user_exists = db_query(User, 'username', username)[0]
    email_exists = db_query(User, 'email', email)[0]
    if user_exists:
        return gen_result_dictionary(
            success = False,
            message = "Username already taken. Please Try another username."
        )
    if email_exists:
        return gen_result_dictionary(
            success = False,
            message = "E-mail address already taken. Please Try another E-Mail address."
        )