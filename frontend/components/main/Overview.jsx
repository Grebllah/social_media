import { Table, Card, Button } from 'react-bootstrap'

function Overview(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    <AccountInformation
                    setRoute={props.setRoute}
                    accDetails={props.accDetails}
                    setAccDetails={props.setAccDetails}/>
                    <TransactionTable/>
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default Overview