import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import './Authentication.css'

function Authentication() {
    const [authRoute, setAuthRoute] = useState('login')
    return (
        <>
            {authRoute === "login"
            ?
                <Login
                    authRoute={authRoute}
                    setAuthRoute={setAuthRoute}
                />
            : authRoute === "register"
            ?
                <Register
                    authRoute={authRoute}
                    setAuthRoute={setAuthRoute}
                />
            :
            <></>
            }
        </>
    )
}

function Login(props) {
    return (
        <>
            <Card className="auth">
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="username"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password"></Form.Control>
                        <Button variant='secondary' id='showButton'>Show Password</Button>
                    </Form.Group>
                    <Button>Login</Button>
                    <Button
                    onClick={
                        ()=>{
                            props.setAuthRoute('register')
                        }
                    }>Register New Account</Button>
                </Card.Body>
            </Card>
        </>
    )
}

function Register(props) {
    return (
        <>
            <Card className="auth">
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail Address:</Form.Label>
                        <Form.Control type="email"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="username"></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password"></Form.Control>
                        <Button variant='secondary' id='showButton'>Show Password</Button>
                    </Form.Group>
                    <Button
                    onClick={
                        ()=>{
                            props.setAuthRoute('login')
                        }
                    }>Cancel</Button>
                    <Button>Create Account</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Authentication