from app import app
from app.utils import *
from app.main.models import *
from app.authentication.models import *

from datetime import datetime
from flask import request

def add_tx_to_db(
        username,
        transaction_details
):
    to_account, amount, currency = transaction_details.values()
    amount = int(amount)
    
    user_sender = db_query(
        User, 'username', username
    )[1]

    user_receiver = db_query(
        User, 'account_number', to_account
    )[1]

    today = datetime.strftime(datetime.today(), '%m %d %Y')

    tx = Transaction(
        from_account = user_sender.account_number,
        to_account = to_account,
        amount = amount,
        currency = currency,
        date = today
    )

    user_sender.balance -= amount
    user_receiver += amount

    db.session.add_all(
        [
            tx,
            user_sender,
            user_receiver
        ]
    )
    db.session.commit()

def transaction_validator(username, transaction_details):
    to_account, from_account, currency = transaction_details.values()
    try:
        amount = int(amount)
    except:
        return False, "Invalid Amount"
    user_sender = db_query(
        User, 'username', username
    )[1]

    user_receiver = db_query(
        User, 'account_number', to_account
    )[1]
    if user_receiver == None:
        return False, "Account does not exist."
    elif to_account == user_sender.account_number:
        return False, "Receiving account cannot be the same as sending account."
    elif amount == '' or int(amount) == 0:
        return False, "Amount must be greater than 0."
    elif amount > user_sender.balance:
        return False, "Insufficient Funds."
    elif currency != 'EUR' and currency != 'USD':
        return False, "Currency in {} not supported.".format(currency)
    else:
        return True, "Transaction Sent."

@app.route('/')
def main():
    return (
        {
            "message":"james app"
        }
    )

@app.route('/send_transaction', methods = {'GET', 'POST'})
def send_transaction():
    message = request.get_json()
    username, transaction_details = message.values()
    validated, validation_msg = transaction_validator(
        username, transaction_details
    )
    if validated:
        add_tx_to_db(
            username, transaction_details
        )
    result = gen_result_dictionary(
        result = validated,
        message = validation_msg
    )
    return result