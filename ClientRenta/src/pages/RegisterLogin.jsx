
import Login from '../components/Login'
import Register from '../components/Register'
import '../styles/RegisterLogin.css'
import { useState } from 'react'

function RegisterLogin () {

    const [containerClass, setContainerClass] = useState("container");
   
    const handleToggleRight = () => { setContainerClass("container") }
    
    const handleToggleLeft = () => { setContainerClass("container active") }

    return(

        <div className={containerClass}>

            <Login/>

            <Register/>


            <div className='toggle-box'>

                <div className='toggle-panel toggle-left'>
                    <h1>Bienvenido!</h1>
                    <p>No tienes una cuenta?</p>
                    <button onClick={handleToggleLeft} className='btn register-btn'> Registrate aquí </button>
                </div>

                <div className='toggle-panel toggle-right'>
                    <h1>Bienvenido!</h1>
                    <p>Ya tienes una cuenta?</p>
                    <button onClick={handleToggleRight} className='btn register-btn'> Ingresa aquí </button>
                </div>
                
            </div>


        </div>
    )
 
}

export default RegisterLogin;