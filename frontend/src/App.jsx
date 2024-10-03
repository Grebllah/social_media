import { useState } from 'react'
import './App.css'
import Overview from '../components/main/Overview'
import TransferPage from '../components/main/TransferPage'
import Navigation from '../components/navigation/Navigation'
import Welcome from '../components/main/Welcome'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Authentication from '../components/authentication/Authentication'


function App() {
  
  const [route, setRoute] = useState('welcome')
    
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

  const [accDetails, setAccDetails] = useState({
    email: '',
    username: '',
    accountNumber: '',
    balance: 0
  })

  const [txTable, setTxTable] = useState({
    exists: false,
    txs: [],
    page: 0
  })

  const onRouteChange = (dest) => {
    setRoute(dest)
  }

  const sendTransaction = async() => {
    const requestOptions = {
      method: 'POST',
      headers: {
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: loginDetails["username"],
        txDetails: txDetails
      })
    }
    let response = await(await fetch('http://127.0.0.1:5555/send_transaction', requestOptions)).json()
    let message = response['message']
    alert(message)
    getOverviewRoute()
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
    let {success, message, result} = response
    alert(message)
    if (success) {
      setRoute("overview")
      setAccDetails(result["account_details"])
      setTxTable(result["tx_table"])
    } 
  }

  const getOverviewRoute = async() => {
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
      'http://127.0.0.1:5555/get_overview_route',
      requestOptions)
    ).json()
    let {success, result} = response
    if (success) {
      setRoute("overview")
      setAccDetails(result["account_details"])
      setTxTable(result["tx_table"])
    } 
  }

  const onNavigatePagination = (value) => {
    let page = txTable.page
    if (value == "Next") {
      setTxTable({
        ...txTable,
        page: page + 1
      })
    } else {
      setTxTable({
        ...txTable,
        page: page - 1
      })
    }
  }

  return (
    <div className='app'>
      <Navigation
      onRouteChange={onRouteChange}
      loginDetails={loginDetails}
      setLoginDetails={setLoginDetails}
      accDetails={accDetails}
      setAccDetails={setAccDetails}
      setTxDetails={setTxDetails}
      txTable={txTable}
      getOverviewRoute={getOverviewRoute}
      />
      <h1>The Bank</h1>
      {route=== 'welcome'
      ?
        <Welcome/>
      
      :route === 'overview'
      ?
        <Overview
        onRouteChange={onRouteChange}
        setRoute={setRoute}
        accDetails={accDetails}
        setAccDetails={setAccDetails}
        txTable={txTable}
        getOverviewRoute={getOverviewRoute}
        onNavigatePagination={onNavigatePagination}
        />

      : route === 'transfer'
      ?
        <TransferPage
          onRouteChange={onRouteChange}
          sendTransaction={sendTransaction}
          accDetails={accDetails}
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
