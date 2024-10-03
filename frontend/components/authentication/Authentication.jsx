import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import './Authentication.css'

function Authentication(props) {
    const [authRoute, setAuthRoute] = useState('login')
    return (
        <>
            <Card>
                <Card.Body>
                    {authRoute === "login"
                    ?
                        <Login
                            authRoute={authRoute}
                            setAuthRoute={setAuthRoute}
                            setLoginDetails={props.setLoginDetails}
                            loginDetails={props.loginDetails}
                            onAuthentication={props.onAuthentication}
                        />
                    : authRoute === "register"
                    ?
                        <Register
                            authRoute={authRoute}
                            setAuthRoute={setAuthRoute}
                            setLoginDetails={props.setLoginDetails}
                            loginDetails={props.loginDetails}
                            onAuthentication={props.onAuthentication}
                        />
                    :
                    <></>
                    }
                </Card.Body>
            </Card>
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
                        <Form.Control
                        type="username"
                        onChange={(e)=>{props.setLoginDetails({...props.loginDetails, ["username"]: e.target.value})}}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                        type="password"
                        onChange={(e)=>{props.setLoginDetails({...props.loginDetails, ["password"]: e.target.value})}}
                        ></Form.Control>
                        {/* <Button variant='secondary' id='showButton'>Show Password</Button> */}
                    </Form.Group>
                    <Button onClick={()=>{props.onAuthentication('login')}}>Login</Button>
                    <Button onClick={()=>{props.setAuthRoute('register')}}>Register New Account</Button>
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
                        <Form.Control
                        type="email"
                        onChange={(e)=>{props.setLoginDetails({...props.loginDetails, ["email"]: e.target.value})}}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                        type="username"
                        onChange={(e)=>{props.setLoginDetails({...props.loginDetails, ["username"]: e.target.value})}}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                        type="password"
                        onChange={(e)=>{props.setLoginDetails({...props.loginDetails, ["password"]: e.target.value})}}
                        ></Form.Control>
                        {/* <Button variant='secondary' id='showButton'>Show Password</Button> */}
                    </Form.Group>
                    <Button onClick={()=>{props.setAuthRoute('login')}}>Cancel</Button>
                    <Button onClick={()=>{props.onAuthentication('register')}}>Create Account</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default Authentication