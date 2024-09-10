import { React, useEffect, useState } from 'react'
import './App.css'
import Overview from '../components/main/Overview'
import TransferPage from '../components/main/TransferPage'
import Navigation from '../components/navigation/Navigation'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [route, setRoute] = useState('overview')
  const [username, setUsername] = useState('')
  const [txDetails, setTxDetails] = useState({
    txToAccount: '',
    txAmount: 0,
    txCurrency: ''
  })

  const onRouteChange = (dest) => {
    setRoute(dest)
  }

  const onFormTextChange = (key, value) => {
    console.log(key, value)
    setTxDetails(
        {...txDetails, [key]: value}
    )
    
    console.log(txDetails)
  }

  const sendTransaction = async() => {
    const requestOptions = {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        txDetails: txDetails
      })
    }
      let response = await(await fetch('http://127.0.0.1:5555/send_transaction', requestOptions)).json()
      let message = response['message']
      alert(message)
  }

  return (
    <div className='app'>
      <Navigation
      onRouteChange={onRouteChange}
      />
      <h1>The Bank</h1>
      {route.route === 'overview'
      ?
        <Overview onRouteChange={onRouteChange}/>
      :
        <TransferPage
          onRouteChange={onRouteChange}
          sendTransaction={sendTransaction}
          onFormTextChange={onFormTextChange}
          txDetails={txDetails}
        />
      }
    </div>
  )
}

export default App
