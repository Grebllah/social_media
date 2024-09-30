import { Button, Navbar } from 'react-bootstrap'

function Navigation(props) {
    return (
        <>
            <Navbar fixed="top" className="justify-content-end">
                <Button onClick={()=>{props.onRouteChange('overview')}}> Overview</Button>
                <Button onClick={()=>{
                    props.onRouteChange('authentication')
                    props.setLoginDetails({
                        email: '',
                        username: '',
                        password: ''
                    })
                }}>Sign Out</Button>
                <Button
                onClick={()=>{
                    console.log(props.loginDetails)
                }}>Show loginDetails</Button>
            </Navbar>
        </>
    )
}

export default Navigation