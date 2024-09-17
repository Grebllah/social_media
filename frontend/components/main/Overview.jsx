import { Table, Card } from 'react-bootstrap'

function Overview(props) {
    return (
        <>
            <Card>
                <Card.Body>
                    <AccountInformation/>
                    <TransactionTable/>
                </Card.Body>
            </Card>
        </>
    )
}

function AccountInformation() {
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
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </ Table>
            </Card.Body>
        </Card>
    )
}

function TransactionTable() {
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