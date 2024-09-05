import { React, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Overview from '../components/main/Overview'
import TransferPage from '../components/main/TransferPage'
import Navigation from '../components/navigation/Navigation'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [data, setData] = useState('')
  const [route, setRoute] = useState('overview')
  const [username, setUsername] = useState('')
  const [txDetails, setTxDetails] = useState({
    txToAccount: '',
    txAmount: 0,
    txCurrency: ''
  })

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:5555')
    console.log(response.data)
  }
  useEffect(() => {
    fetchAPI()
  }, [])

  const onRouteChange = (dest) => {
    setRoute({route: dest})
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
        />
      }
    </div>
  )
}

export default App
