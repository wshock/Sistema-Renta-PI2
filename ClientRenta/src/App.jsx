import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import RegisterLogin from './pages/RegisterLogin'
import { AuthProvider } from './context/AuthContext'
import Profile from './pages/Profile'
import ProtectedRoutes from './ProtectedRoutes'
import HomePage from './pages/HomePage'
import Feed from './pages/Feed'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={<HomePage />}/> { /* Landing o Home page */ }
          <Route path='/log-reg' element={<RegisterLogin />}/>

          <Route element={<ProtectedRoutes />}>
            <Route path='/feed' element={<Feed />}/>
            <Route path='/profile' element={<Profile/>} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
