import { useState } from 'react'
import './App.css'
import Overview from '../components/main/Overview'
import TransferPage from '../components/main/TransferPage'
import Navigation from '../components/navigation/Navigation'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Authentication from '../components/authentication/Authentication'


function App() {
  
  const [route, setRoute] = useState('authentication')
    
  const [txDetails, setTxDetails] = useState({
    txToAccount: '',
    txAmount: 0,
    txCurrency: ''
  })

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    username: '',
    password: ''
  })

  const onRouteChange = (dest) => {
    setRoute(dest)
  }

  const sendTransaction = async() => {
    const requestOptions = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginDetails.username,
        txDetails: txDetails
      })
    }
      let response = await(await fetch('http://127.0.0.1:5555/send_transaction', requestOptions)).json()
      let message = response['message']
      alert(message)
  }

  const onAuthentication = async(route)=>{
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-type' : "application/json"
      },
      body: JSON.stringify({
          loginDetails: loginDetails
      })
    }
    let response = await (
      await fetch(
      'http://127.0.0.1:5555/' + route,
      requestOptions)
    ).json()
    let message = response["message"]
    alert(message)
  }

  return (
    <div className='app'>
      <Navigation onRouteChange={onRouteChange}/>
      <h1>The Bank</h1>
      {route === 'overview'
      ?
        <Overview onRouteChange={onRouteChange}/>
      : route === 'transfer'
      ?
        <TransferPage
          onRouteChange={onRouteChange}
          sendTransaction={sendTransaction}
          txDetails={txDetails}
          loginDetails={loginDetails}
          setTxDetails={setTxDetails}
        />
      : route === 'authentication'
      ?
        <Authentication
        loginDetails={loginDetails}
        setLoginDetails={setLoginDetails}
        onAuthentication={onAuthentication}
        />
      :
      <></>
      }
    </div>
  )
}

export default App
