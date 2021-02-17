import React from "react"

import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Sidebar from './sidebar.js'
import { graphql, useStaticQuery, Link} from "gatsby"
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden'
import SEO from './seo'
import "./layout.css"

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

const Header = ( { title } ) => {
    //const data = useStaticQuery(query)
    return (
    <header>
        <AppBar position="static" color="primary">
            <Toolbar>
                <Hidden smUp>
                    <MenuIcon/>
                </Hidden>
                
                <Button color="inherit" component={Link} to="/">{title}</Button>
                <Button color="inherit" component={Link} to="/about">About</Button>
            </Toolbar>    
        </AppBar>
    </header>    
)}

const Footer = ( { author } ) => {

    return (
        <Paper>
            <footer>
        
            written by { author }
            (C) { (new Date()).getFullYear() } 
            </footer>
        </Paper>
)}
 

const Layout = ({ children, title }) =>{
    const data = useStaticQuery(query)
    return (
    <div>
        <SEO title={title}/>
        <Header title={data.site.siteMetadata.title}/>
        <Container  className="middle">
        <Grid container spacing={3}>
            <Grid item sm={9}>
                <Paper><Container><div className="main">{children}</div></Container></Paper>
            </Grid>

            <Grid item sm={3}>
                <Paper><Container><Sidebar/></Container></Paper>
            </Grid>
        </Grid>
        </Container>

        <Footer author={data.site.siteMetadata.author}/>
    </div>
)}
export default Layout
