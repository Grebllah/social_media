from app import app
from app.utils import *
from app.main.models import *
from app.authentication.models import *

from datetime import datetime

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

@app.route('/')
def main():
    return (
        {
            "message":"james app"
        }
    )