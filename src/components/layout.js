import React from "react"

//import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Sidebar from './sidebar.js'
import { graphql, useStaticQuery, Link } from "gatsby"
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import { Drawer, IconButton, Divider, List, ListItem } from '@material-ui/core'
import { TwitterIcon } from 'react-share'
import SEO from './seo'
import Typography from '@material-ui/core/Typography'

import "./layout.css"
import "./syntax_hilight.css"

const query = graphql`
{
    site {
        siteMetadata {
            title
            author
            description
            social { twitter }
        }
    }
}
`

const Header = ({ siteTitle, siteDescription }) => {
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
            <AppBar position="relative" color="primary">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton onClick={handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>

                    <Button color="inherit" component={Link} to="/">{siteTitle}</Button>
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

            <div className="siteTitle">
                <Container>
                    <h1><Link to="/">{siteTitle}</Link></h1>
                    <h3>{siteDescription}</h3>
                </Container>
            </div>
        </header>
    )
}

const Footer = ({ author, social }) => {

    return (
        <footer className="siteFooter">
            written by {author} (C) {(new Date()).getFullYear()},
                powered by Gatsby and its aksite starter.

            <a href={`https://twitter.com/${social.twitter}`}>
                <TwitterIcon size={32} />
            </a>

        </footer>
    )
}

const Layout = ({ children, title, description, image }) => {
    const data = useStaticQuery(query)
    const siteTitle = data.site.siteMetadata.title
    const siteDescription = data.site.siteMetadata.description
    const author = data.site.siteMetadata.author

    if (description === undefined) { description = siteDescription }

    return (
        <div>
            <SEO title={`${title} | ${siteTitle}`} description={description} image={image} lang="ja" />
            <Header siteTitle={siteTitle} siteDescription={siteDescription} />
            <Container>
                <div className="main">
                    <Grid container spacing={6}>
                        <Grid item md={8} xs={12}>
                            {children}
                        </Grid>

                        <Grid item md={4} xs={12}>
                            <Sidebar />
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <Footer author={author} social={data.site.siteMetadata.social} />

        </div>
    )

}
export default Layout
