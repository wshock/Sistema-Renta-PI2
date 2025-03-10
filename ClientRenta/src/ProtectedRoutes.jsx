import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";



function ProtectedRoutes(){
    
    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) return <Navigate to='/log-reg' replace />

    return (
        <Outlet/> 
    )

}

export default ProtectedRoutes;