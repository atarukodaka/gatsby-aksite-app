import React from "react"

import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Sidebar from './sidebar.js'
import { graphql, useStaticQuery, Link } from "gatsby"
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import SEO from './seo'
import "./layout.css"
import { Drawer, IconButton, Divider, List, ListItem, ListItemText } from '@material-ui/core'

const query = graphql`
{
    site {
        siteMetadata {
            title
            author
        }
    }
}
`

const Header = ({ title }) => {
    //const data = useStaticQuery(query)
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <header>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>

                    <Button color="inherit" component={Link} to="/">{title}</Button>
                    <Button color="inherit" component={Link} to="/about">About</Button>
                </Toolbar>
            </AppBar>

            <Drawer open={open}>
                <div>
                    <IconButton onClick={handleDrawerClose}>
                        <MenuIcon />
                    </IconButton>
                    <Divider />

                    <List component="nav">
                        <ListItem button component={Link} to="/about">About</ListItem>
                        <ListItem button component={Link} to="/archives">Archives</ListItem>
                        <ListItem button component={Link} to="/directories">Directories</ListItem>
                    </List>
                </div>

            </Drawer>
        </header>
    )
}


const Footer = ({ author }) => {

    return (
        <footer>
            <Paper style={{ padding: "1em" }}>
                written by {author} (C) {(new Date()).getFullYear()},
                powered by Gatsby and its aksite starter
            </Paper>
        </footer>
    )
}



const Layout = ({ children, title }) => {
    const data = useStaticQuery(query)

    return (
        <>
            <SEO title={title} />
            <Header title={data.site.siteMetadata.title} />
            <Container>
                <Grid container spacing={3}>
                    <Grid item md={8} xs={12}>
                        <Paper>
                            {children}
                        </Paper>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Paper>
                            <Sidebar/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />

        </>

    )
    /*
    return (
        <div>
            <SEO title={title} />
            <Grid sm={12}>
                <Header title={data.site.siteMetadata.title} />
            </Grid>
            <Container  className="main">
                <Grid container spacing={0}>
                    <Grid item md={9} sm={12}>
                        <Container>{children}</Container>
                    </Grid>

                    <Grid item md={3} sm={12}>
                        <Hidden mdDown>
                        <Container><Sidebar /></Container>
                        </Hidden>
                    </Grid>
                </Grid>
            </Container>

            <Grid sm={12}>
                <Footer author={data.site.siteMetadata.author} />   
            </Grid>
            
        </div>
    )
    */
}
export default Layout
