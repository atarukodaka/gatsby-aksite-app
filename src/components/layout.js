import React from "react"
import { Link } from "gatsby"

import { MDXProvider } from "@mdx-js/react"
//import { Message, Divider } from "theme-ui"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import "./layout.css"
import Header from "./header.js"
import Footer from "./footer.js"
import Sidebar from "./sidebar.js"
import SEO from "./seo.js"
//import { data } from "../templates/index-template";


const shortcodes = { Link }

const Layout = ({ children, ogpTitle }) => {

    return (
        <Container>
            <SEO title={ogpTitle}/>
                        
            <Header />    
            <Grid container spacing={4}>
                <Grid item xs={12} sm={9}>
                    <Container>
                        <MDXProvider components={shortcodes}>
                        {children}
                        </MDXProvider>
                    </Container>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Sidebar />
                </Grid>

            </Grid>


            <Footer />
        </Container>
    )
}

export default Layout