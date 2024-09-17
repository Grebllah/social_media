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
                            <td>
                                James
                            </td>
                            <td>
                                1234567890
                            </td>
                            <td>
                                $69.00
                            </td>
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
                                <td>001</td>
                                <td>1234567890</td>
                                <td>0987654321</td>
                                <td>100</td>
                                <td>dollars</td>
                                <td>01-01-2001</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </>
    )
}

export default Overview