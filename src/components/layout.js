import React from "react"
import Header from "./header.js"
import Footer from "./footer.js"
import Sidebar from "./sidebar.js"

const Layout = ( props) => {
    return (
        <div>
            <Header/>
            
            <main>
            { props.children}
            </main>

            <Sidebar/>

            <Footer/>
        </div>
    )
}

export default Layout