import { Card, Form, Button } from "react-bootstrap";
import './Main.css'

function TransferPage(props) {
    return (
        <>        
            <Card id="transferpage">
                <Card.Body>
                    <TransferForm
                    onTxFormTextChange={props.onTxFormTextChange}
                    txDetails={props.txDetails}
                    loginDetails={props.loginDetails}
                    setTxDetails={props.setTxDetails}
                    />
                </Card.Body>
            </Card>
        </>
    )
}

function TransferForm(props) {
    return (
        <>
            <Card id="transfer">
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            To Account:
                        </Form.Label>
                        <Form.Control
                        onChange={(e)=>{props.setTxDetails({...props.txDetails, ["txToAccount"]: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Amount:
                        </Form.Label>
                        <Form.Control
                        onChange={(e)=>{props.setTxDetails({...props.txDetails, ["txAmount"]: e.target.value})}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Currency:
                        </Form.Label>
                        <Form.Control
                        onChange={(e)=>{props.setTxDetails({...props.txDetails, ["txCurrency"]: e.target.value})}}/>
                    </Form.Group>
                    <Button
                    onClick={()=>{console.log(props.username, props.txDetails)}}
                        // props.sendTransaction(props.txDetails)
                    >Transfer Now
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default TransferPage