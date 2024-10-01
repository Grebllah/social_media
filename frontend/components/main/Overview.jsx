import { Table, Card, Button } from 'react-bootstrap'

function Overview(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    <AccountInformation
                    setRoute={props.setRoute}
                    accDetails={props.accDetails}
                    setAccDetails={props.setAccDetails}
                    />
                    <TransactionTable
                    txTable={props.txTable}
                    getOverviewRoute={props.getOverviewRoute}
                    onNavigatePagination={props.onNavigatePagination}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

function AccountInformation(props) {
    let accInfo = props.accDetails
    return (
        <Card>
            <Card.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>
                                Name:     
                            </th>
                            <th>
                                Account #:
                            </th>
                            <th>
                                Balance:
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{accInfo.username}</td>
                            <td>{accInfo.accountNumber}</td>
                            <td>{accInfo.balance}</td>
                        </tr>
                    </tbody>
                </ Table>
                <Button
                onClick={()=>{props.setRoute("transfer")}}>Transfer Funds</Button>
            </Card.Body>
        </Card>
    )
}

function TransactionTable(props) {
    let txTable = props.txTable
    return (
        <>
            <Card>
                <Card.Body>
                    <Table  striped bordered hover>
                        <thead>
                            <tr>
                                <th>Transaction ID:</th>
                                <th>From Account:</th>
                                <th>To Account:</th>
                                <th>Amount:</th>
                                <th>Currency:</th>
                                <th>Date:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {txTable.tx_exists
                            ?  
                                txTable.txs[txTable.page].txs_on_page.map((tx) => (
                                <tr>
                                    <td>{tx.id}</td>
                                    <td>{tx.from_account}</td>
                                    <td>{tx.to_account}</td>
                                    <td>{tx.amount}</td>
                                    <td>{tx.currency}</td>
                                    <td>{tx.date}</td>
                                </tr>
                                ))
                            :
                                <tr>
                                    <td>
                                        <p className="center-text">No transactions found!</p>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </Table>
                    {txTable['tx_exists']
                    ?
                        <PaginationButtons
                        onNavigatePagination={props.onNavigatePagination}
                        txTable={props.txTable}
                        />
                    :
                        null
                    }
                </Card.Body>
            </Card>
        </>
    )
}

function PaginationButtons(props){
    let txTable = props.txTable

    return (
        <>
        {txTable.txs[txTable.page]['has_prev']
        ?
            <Button
            onClick={()=>{props.onNavigatePagination('Previous')}}
            >Prev</Button>
        :
            null
        }
        {txTable.txs[txTable.page]['has_next']
        ?
            <Button
            onClick={()=>{props.onNavigatePagination('Next')}}
            >Next</Button>
        :
            null
        }
        </>
    )
}
export default Overview