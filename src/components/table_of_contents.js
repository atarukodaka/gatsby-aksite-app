import React from "react"
import { Link } from 'gatsby'
import { Paper, List, ListItem} from '@material-ui/core'
import styles from './table_of_contents.module.css'


// Table of Contents
/*
const Tree = ({nodes}) => (
    <List>
        {
            nodes.map(v=>(
                <>
                <ListItem key={v.title}>
                    <Link to={v.url}>{v.title}</Link>
                </ListItem>
                {v.items && (<Tree nodes={v.items}/>)}                
                </>
            ))
        }

    </List>
)
*/

const Tree = ({nodes}) => (
    
    <ul className={styles.tableOfContents}>
        {
            nodes.map(v=>(
                <>
                <li key={v.title}>
                    <Link to={v.url} smooth={true} duration={800}>{v.title}</Link>
                </li>
                {v.items && (<Tree nodes={v.items}/>)}
                </>
            ))
        }

    </ul>

)

const TableOfContents = ( {toc} ) => (

    <Tree nodes={toc.items}/>

)



export default TableOfContents