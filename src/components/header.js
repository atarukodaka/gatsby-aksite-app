import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Button, makeStyles, Breadcrumbs, AppBar, Hidden, Toolbar, 
    IconButton } from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"


const useStyles = makeStyles({
    toptitle: {
        fontSize: "x-large",
        color: "#aaa",
        backgroundColor: "black",
        padding: "20px"

    },
    navitation_bar: {
        color: "#ddd",
        backgroundColor: "#eee",

    }

})
const Header = () => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    )
    const classes = useStyles()
    return (
        <header>
            <Hidden xsDown>
                <div className={classes.toptitle}> {data.site.siteMetadata.title} </div>
                <nav className={classes.navitation_bar}>
                    <Button component={Link} to="/">Top</Button>
                    <Button component={Link} to="/about">About</Button>
                </nav>
            </Hidden>

            <Hidden smUp>
                <AppBar>
                <Toolbar>
                <IconButton>
                <MenuIcon />
                        </IconButton>
                        NEWS
                </Toolbar>
                    
                    
                </AppBar>
            </Hidden>
        </header>
    )
}

export default Header