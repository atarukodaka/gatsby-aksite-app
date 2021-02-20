import React from "react"
import { graphql, navigate, useStaticQuery } from "gatsby"
import { List, ListItem, ListItemText, Paper, Button} from '@material-ui/core'

const Hello = ( ) => {
    const data = useStaticQuery(graphql`
    {
        site {
            siteMetadata {
                author
            }
        }
    }        
    `)
    return (
        <Paper>
            <ul>
                <li>
                    <Button>ASD</Button>
                    <ul>
                        <li>
                            <Button onClick={()=>{navigate("/about")}}>OPIUPOIU</Button>
                        </li>
                    </ul>
                </li>
            </ul>

        <List>
            <ListItem>ASD
            <List>
                <ListItem>
                    <Button>ASDASD</Button>
                </ListItem>
            </List>
            </ListItem>
        </List>
        </Paper>
    )
}

export default Hello
