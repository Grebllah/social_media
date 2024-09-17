import { Card, Form, Button } from "react-bootstrap";
import './Main.css'

function TransferPage(props) {
    return (
        <>        
            <Card>
                <Card.Body>
                    <TransferForm
                    onFormTextChange={props.onFormTextChange}
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
                        onChange={(e)=>{props.onFormTextChange("txToAccount", e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Amount:
                        </Form.Label>
                        <Form.Control
                        onChange={(e)=>{props.onFormTextChange("txAmount", e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Currency:
                        </Form.Label>
                        <Form.Control
                        onChange={(e)=>{props.onFormTextChange("txCurrency", e.target.value)}}/>
                    </Form.Group>
                </Card.Body>
            </Card>
        </>
    )
}

export default TransferPage