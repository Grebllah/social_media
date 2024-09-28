from app import app
from app.utils import *
from app.main.models import *
from app.authentication.models import *

from datetime import datetime
from flask import request

def add_tx_to_db(
        username,
        txDetails
):
    to_account, amount, currency = txDetails.values()
    amount = int(amount)
    
    user_sender = db_query(
        User, 'username', username
    )[1]

    user_receiver = db_query(
        User, 'username', to_account
    )[1]

    today = datetime.strftime(datetime.today(), '%m %d %Y')

    tx = Transaction(
        from_account = user_sender.account_number,
        to_account = to_account.account_number,
        amount = amount,
        currency = currency,
        date = today
    )

    user_sender.balance -= amount
    user_receiver.balance += amount

    db.session.add_all(
        [
            tx,
            user_sender,
            user_receiver
        ]
    )
    db.session.commit()

def transaction_validator(username, txDetails):
    to_account, amount, currency = txDetails.values()
    try:
        amount = int(amount)
    except:
        return False, f"Invalid Amount"
    user_sender = db_query(
        User, 'username', username
    )[1]

    user_receiver = db_query(
        User, 'username', to_account
    )[1]
    if user_receiver == None:
        return False, "Account does not exist."
    elif to_account == user_sender.account_number:
        return False, "Receiving account cannot be the same as sending account."
    if amount == '' or int(amount) == 0:
        return False, "Amount must be greater than 0."
    elif amount > user_sender.balance:
        return False, "Insufficient Funds."
    elif currency != 'EUR' and currency != 'USD':
        return False, "Currency in {} not supported.".format(currency)
    else:
        return True, "Transaction Sent."
    
def get_overview(user):
    return gen_result_dictionary(
        account_details = gen_result_dictionary(
            username = user.username,
            accountNumber = user.account_number,
            balance = user.balance
        )
    )

@app.route('/')
def main():
    return (
        {
            "message":"james app"
        }
    )

@app.route('/send_transaction', methods = {'GET', 'POST'})
def send_transaction():
    print(request)
    message = request.get_json()
    print(message)
    username, txDetails = message.values()
    validated, validation_msg = transaction_validator(
        username, txDetails
    )
    if validated:
        print("VALIDATED")
        add_tx_to_db(
            username, txDetails
        )
    result = gen_result_dictionary(
        result = validated,
        message = validation_msg
    )
    print(result)
    return result