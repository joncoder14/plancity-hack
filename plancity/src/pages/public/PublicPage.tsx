import { Outlet } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router";

function PublicPages (){
    const {isAuthenticated} = useAuth()
    return isAuthenticated? <Navigate to={"/categories"}/>: <Outlet/>
}

export default PublicPages