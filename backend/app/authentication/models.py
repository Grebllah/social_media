from app import db

from werkzeug.security import generate_password_hash, check_password_hash

class User (db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(30), index = True, unique = True)
    email = db.Column(db.String(64), index = True, unique = True)
    password = db.Column(db.String(64))
    account_number = db.Column(db.String(18))
    balance = db.Column(db.Integer)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        check_password_hash(self.password, password)

    def __repr__(self):
        return '<User {}>'.format(self.username)