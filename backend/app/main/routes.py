from app import app
from app.utils import *
from app.main.models import *
from app.authentication.models import *
from config import Config

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
        User, 'account_number', txToAccount
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
        User, 'account_number', txToAccount
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
    if user:
        tx_exists, txs = fetch_transactions(user.account_number)
        return gen_result_dictionary(
            account_details = gen_result_dictionary(
                username = user.username,
                accountNumber = user.account_number,
                balance = user.balance
            ),
            tx_table = gen_result_dictionary(
                tx_exists = tx_exists,
                txs = txs,
                page = 0
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
    raw_txs = tx_query.all()
    if len(raw_txs) == 0:
        return False, []
    else:
        paginated_txs = get_pagination_object(tx_query)
        return True, paginated_txs

def generate_pagination_dict(
        has_prev, txs_on_page, has_next
):
    return {
        "has_prev": has_prev,
        "txs_on_page": txs_on_page,
        "has_next": has_next
    }

def get_pagination_object(sqlalchemy_obj):
    paginates = []
    num_pages = sqlalchemy_obj.paginate(
        page = 1,
        per_page = Config.TXS_PER_PAGE
    ).pages
    for page_num in range(1, num_pages + 1):
        page = sqlalchemy_obj.paginate(
            page = page_num,
            per_page = Config.TXS_PER_PAGE
        )
        paginate = generate_pagination_dict(
            page.has_prev,
            [get_dict_from_object(tx) for tx in page.items],
            page.has_next
        )
        paginates.append(paginate)
    return paginates
    

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

@app.route('/get_overview_route', methods = {'GET', 'POST'})
def get_overview_route():
    message = request.get_json()['loginDetails']
    _, username, _ = message.values()
    user = db_query(User, 'username', username)[1]
    result = get_overview(user)
    return gen_result_dictionary(
        success = True,
        result = result
    )