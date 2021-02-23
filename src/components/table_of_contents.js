import React from "react"
import { Link } from 'gatsby'
//import { List, ListItem, ListItemText } from '@material-ui/core'
//import styles from './table_of_contents.module.css'
//import Button from '@material-ui/core'

// Table of Contents

const Tree = ({ nodes }) => (
    <ol>
        {
            nodes.map(v => (
                <>
                    <li key={v.url}>
                        <Link to={v.url} style={{ textDecoration: 'none' }}>{v.title}</Link>
                    </li>
                    {v.items && (<Tree nodes={v.items} />)}
                </>
            ))
        }
    </ol>

)


const TableOfContents = ({ toc }) => (
     <Tree nodes={toc.items} /> 
)



export default TableOfContents