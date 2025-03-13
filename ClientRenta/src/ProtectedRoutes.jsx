import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";



function ProtectedRoutes(){
    
    const { isAuthenticated, loading } = useAuth();

    if (loading) return (<div>Loading</div>); // Mientras esté cargando mostrar el loading

    return (!isAuthenticated) ? <Navigate to='/log-reg' replace /> : <Outlet /> // Si no está autenticado, redireccionar a /log-reg, 
                                                                                // si sí está autenticado, redireccionar a el componente al cual quiere acceder

}

export default ProtectedRoutes;