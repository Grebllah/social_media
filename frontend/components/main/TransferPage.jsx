import { Card, Form, Button } from "react-bootstrap";
import './Main.css'

function TransferPage(props) {
    return (
        <>        
            <Card>
                <Card.Body>
                    <TransferForm
                    onTxFormTextChange={props.onTxFormTextChange}
                    txDetails={props.txDetails}
                    />
                    <Button
                    onClick={()=>{
                        props.sendTransaction(props.txDetails)
                    }}
                    >Transfer Now
                    </Button>
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
                        onChange={(e)=>{props.onTxFormTextChange("txToAccount", e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Amount:
                        </Form.Label>
                        <Form.Control
                        onChange={(e)=>{props.onTxFormTextChange("txAmount", e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Currency:
                        </Form.Label>
                        <Form.Control
                        onChange={(e)=>{props.onTxFormTextChange("txCurrency", e.target.value)}}/>
                    </Form.Group>
                </Card.Body>
            </Card>
        </>
    )
}

export default TransferPage