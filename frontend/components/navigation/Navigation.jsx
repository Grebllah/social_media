import { Button, Navbar } from 'react-bootstrap'

function Navigation(props) {
    return (
        <>
            <Navbar fixed="top" className="justify-content-end">
                <Button onClick={()=>{props.onRouteChange('overview')}}> Overview</Button>
                <Button onClick={()=>{props.onRouteChange('authentication')}}> Login / Sign Out</Button>
            </Navbar>
        </>
    )
}

export default Navigation