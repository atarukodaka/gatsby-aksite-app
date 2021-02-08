import React from "react"

import { MDXProvider } from "@mdx-js/react"
//import { Message, Divider } from "theme-ui"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from "./header.js"
import Footer from "./footer.js"
import Sidebar from "./sidebar.js"

const Foo = () => (<big>FOO TAG USED HERE</big>)

    
const shortcodes = { Foo }

const Layout = ({ children, location }) => {
    return (
        <Container>
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