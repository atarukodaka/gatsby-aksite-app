import React from "react"
import Header from "./header.js"
import Footer from "./footer.js"
import Sidebar from "./sidebar.js"

const Layout = ( props) => {
    return (
        <div>
            <Header/>
            <hr/>
            { props.children}
            <hr/>
            <Sidebar/>
            <hr/>
            <Footer/>
        </div>
    )
}

export default Layout