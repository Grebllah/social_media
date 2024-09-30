import { Button, Navbar } from 'react-bootstrap'

function Navigation(props) {
    return (
        <>
            <Navbar fixed="top" className="justify-content-end">
                <Button onClick={()=>{props.onRouteChange('authentication')}}>Login</Button>
                <Button onClick={()=>{props.onRouteChange('overview')}}> Overview</Button>
                <Button onClick={()=>{
                    props.onRouteChange('authentication')
                    props.setLoginDetails({
                        email: '',
                        username: '',
                        password: ''
                    })
                    props.setAccDetails({
                        email:'',
                        username: '',
                        accountNumber: '',
                        balance: 0
                    })
                    props.setTxDetails({
                        txToAccount: '',
                        txAmount: 0,
                        txCurrency: ''
                    })
                }}>Sign Out</Button>
                <Button
                onClick={()=>{
                    console.log(props.accDetails)
                }}>Show accDetails</Button>
                <Button
                onClick={()=>{
                    console.log(props.txTable)
                }}>Show txTable</Button>
                <Button
                onClick={()=>{
                    fetch("http://127.0.0.1:5555/clear")
                }}>Clear db</Button>
            </Navbar>
        </>
    )
}

export default Navigation