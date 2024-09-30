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
    txToAccount, txAmount, txCurrency = txDetails.values()
    txAmount = int(txAmount)
    
    user_sender = db_query(
        User, 'username', username
    )[1]

    user_receiver = db_query(
        User, 'username', txToAccount
    )[1]

    today = datetime.strftime(datetime.today(), '%m %d %Y')

    tx = Transaction(
        from_account = user_sender.account_number,
        to_account = user_receiver.account_number,
        amount = txAmount,
        currency = txCurrency,
        date = today
    )

    user_sender.balance -= txAmount
    user_receiver.balance += txAmount

    db.session.add_all(
        [
            tx,
            user_sender,
            user_receiver
        ]
    )
    db.session.commit()

def transaction_validator(username, txDetails):
    txToAccount, txAmount, txCurrency = txDetails.values()
    try:
        txAmount = int(txAmount)
    except:
        return False, f"Invalid Amount"
    user_sender = db_query(
        User, 'username', username
    )[1]

    user_receiver = db_query(
        User, 'username', txToAccount
    )[1]
    if user_receiver == None:
        return False, "Account does not exist."
    elif txToAccount == user_sender.account_number:
        return False, "Receiving account cannot be the same as sending account."
    if txAmount == '' or int(txAmount) == 0:
        return False, "Amount must be greater than 0."
    elif txAmount > user_sender.balance:
        return False, "Insufficient Funds."
    elif txCurrency != 'EUR' and txCurrency != 'USD':
        return False, "Currency in {} not supported.".format(txCurrency)
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

def fetch_transactions(account_number):
    tx_query = Transaction.query.filter_by(
        to_account = account_number
    ).union(
        Transaction.query.filter_by(
            from_account = account_number
        )
    ).order_by(
        Transaction.id.desc()
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
    message = request.get_json()
    username, txDetails = message.values()
    validated, validation_msg = transaction_validator(
        username, txDetails
    )
    if validated:
        add_tx_to_db(
            username, txDetails
        )
    result = gen_result_dictionary(
        result = validated,
        message = validation_msg
    )
    return result