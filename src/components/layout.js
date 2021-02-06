import React from "react"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from "./header.js"
import Footer from "./footer.js"
import Sidebar from "./sidebar.js"

const Layout = ({ children }) => {
    return (
        <Container>
            <Header />

            <Grid container spacing="4">
                <Grid item xs={8}>
                    <Container>
                        {children}
                    </Container>
                </Grid>
                <Grid item xs={4}>
                    <Sidebar />
                </Grid>

            </Grid>

            <Footer />
        </Container>

    )
}

export default Layout