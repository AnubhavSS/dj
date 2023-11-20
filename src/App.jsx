import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Graph from './components/Graph'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Login/>}/>

      <Route path='/dashboard/:id' element={<Dashboard/>}/>
        </Routes>
     </BrowserRouter>
   
    </>
  )
}

export default App
