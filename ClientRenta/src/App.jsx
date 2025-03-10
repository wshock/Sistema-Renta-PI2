import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import RegisterLogin from './pages/RegisterLogin'
import { AuthProvider } from './context/AuthContext'
import Profile from './pages/Profile'
import ProtectedRoutes from './ProtectedRoutes'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<div>Home page o Landing page</div>}/> { /* Landing o Home page */ }
          <Route path='/log-reg' element={<RegisterLogin />}/>

          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />}/>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
