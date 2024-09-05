import React, { Component } from "react";
import { Card, Form, Button, Nav } from "react-bootstrap";
import Navigation from "../navigation/Navigation";

function TransferPage(props) {
    return (
        <>        
            <Card>
                <Card.Body>
                    <TransferForm/>
                    <Button
                     onClick={props.sendTransaction}
                    >Transfer Now
                    </Button>
                </Card.Body>
            </Card>
        </>
    )
}

function TransferForm() {
    return (
        <>
            <Card>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            To Account:
                        </Form.Label>
                        <Form.Control/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Amount:
                        </Form.Label>
                        <Form.Control/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            Currency:
                        </Form.Label>
                        <Form.Control/>
                    </Form.Group>
                </Card.Body>
            </Card>
        </>
    )
}

export default TransferPage