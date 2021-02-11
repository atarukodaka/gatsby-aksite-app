import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Button, AppBar, Toolbar} from "@material-ui/core"
import headerStyles from './header.module.css'

const Header = ( ) => {
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
    return (
        <div>
            <AppBar>
                <Toolbar>
                    {data.site.siteMetadata.title}
                
                    <Button component={Link} to="/">Top</Button>
                    <Button component={Link} to="/about">About</Button>
                
                </Toolbar>
            </AppBar>
            </div>
        
    )
}

export default Header