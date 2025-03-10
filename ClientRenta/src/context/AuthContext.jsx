import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, logoutRequest, verifyTokenRequest } from '../api/auth.js'
import Cookies from 'js-cookie'

export const AuthContext = createContext();

export const useAuth = () => {                 // Creación del hook que me permitirá acceder a todas las cosas "exportadas"
    const context = useContext(AuthContext)    // de este contexto desde los componentes que se encuentren dentro de este mismo.
    if(!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }  
    return context
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); // State para saber la info del usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false); // State para saber si el usuario está Authenticated
    const [registerErrors, setRegisterErrors] = useState([]); // State para manejar y mostrar los errores del registro
    const [loginErrors, setLoginErrors] = useState([]); // State para manejar y mostrar los errores del login

    const signUp = async (user) => { // Funcion para registrarse, setea el user (sus datos), y setea su Auth a true
        try {
            const res = await registerRequest(user);
            console.log(res.data)
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data)
            setRegisterErrors(error.response.data)
        }
    }

    const signIn = async (user) => { // Funcion para logearse, setea el user (sus datos), y setea su Auth a true
        try {
            const res = await loginRequest(user);
            console.log(res.data)
            setUser(res.data);
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response.data)
            setLoginErrors(error.response.data)
        }
    }

    const logOut = async () => { // Funcion para cerrar sesión, setea el user a null y setea su Auth a false
        try {
            await logoutRequest();
            setUser(null);
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        const cookies = Cookies.get()
        if (cookies.token) {
            try {
                const res = verifyTokenRequest(cookies.token)
            } catch (error) {
                
            }
        }
    }, []);

    return (
        <AuthContext.Provider          // "Exportación" de todas las funciones y estados para poder ser usados en todos los componentes
            value={{                   // que se encuentren dentro de este contexto
                signUp,
                signIn,
                logOut,
                user,
                isAuthenticated,
                registerErrors,
                loginErrors
            }}
            
        >
            {children}

        </AuthContext.Provider>
    )


}
