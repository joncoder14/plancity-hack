import Footer from "../Footer"
import Header from "../Header"
import { Outlet } from "react-router"

function PublictLayout (){
    return(
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
)
}

export default PublictLayout