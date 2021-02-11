import React from "react"

import Paper from '@material-ui/core/Paper'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Sidebar from './sidebar.js'
import { graphql, useStaticQuery, Link} from "gatsby"
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
        <AppBar position="static">
            <Toolbar>
                {title}
                <Button component={Link} to="/">Top</Button>
                    <Button component={Link} to="/about">About</Button>
                              </Toolbar>    
        </AppBar>
    </header>    
)}

const Footer = ( { author } ) => {

    return (<footer>
        <Paper>
            (C) written by { author }
            { (new Date()).getFullYear() } 
        </Paper>
    </footer>
)}
 

const Layout = ({ children }) =>{
    const data = useStaticQuery(query)
    return (

    <div>
        <Header title={data.site.siteMetadata.title}/>

        <Grid container spacing={3}>
            <Grid item sm={9}>
                <Paper><Container>{children}</Container></Paper>
            </Grid>

            <Grid item sm={3}>
                <Sidebar/>
            </Grid>
        </Grid>
        
        <Footer author={data.site.siteMetadata.author}/>
    </div>
)}
export default Layout
