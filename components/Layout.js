import Footer from "./Footer"
import Navbar1 from "./Navbar"

function Layout({children}) {
    return (
        <>
           <Navbar1/>
                {children}
           <Footer/> 
        </>
    )
}

export default Layout;

