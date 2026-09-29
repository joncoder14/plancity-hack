import { Outlet } from "react-router";
import Header from "../PrivateHeader";

function PrivateLayout (){
    return(
    <>
        <Header/>
        <Outlet/>
    </>
)
}

export default PrivateLayout