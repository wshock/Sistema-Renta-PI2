import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import RegisterLogin from './pages/RegisterLogin'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Home page o Landing page</div>}/> { /* Landing o Home page */ }
        <Route path='/log-reg' element={<RegisterLogin />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
