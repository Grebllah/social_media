import { React, useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Overview from '../components/main/Overview'
import TransferPage from '../components/main/TransferPage'
import Navigation from '../components/navigation/Navigation'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


function App() {
  const [count, setCount] = useState(0)
  const [data, setData] = useState("")
  const [route, setRoute] = useState({
    route: 'overview'
  })
  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:5555/api/data')
    console.log(response.data)
  }
  useEffect(() => {
    fetchAPI()
  }, [])

  const onRouteChange = (dest) => {
    setRoute({route: dest})
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
        <TransferPage onRouteChange={onRouteChange}/>
      }
    </div>
  )
}

export default App
