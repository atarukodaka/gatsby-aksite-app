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
                    <li key={v.url}>
                        <Link to={v.url} style={{ textDecoration: 'none' }}>{v.title}</Link>
                    
                    {v.items && (<Tree nodes={v.items} />)}
                    </li>
            ))
        }
    </ol>

)


const TableOfContents = ({ toc }) => (

    (toc.items) ? (<Tree nodes={toc.items} />) : null
)

/*
const TocBox = ({ node, title, useAccordion }) => {
    const defaultTitle = "Table of Contents"

    return (
        <div className={styles.tableOfContents}>
            { (useAccordion) ?
                (<Accordion defaultExpanded={true}>
                    <AccordionSummary>
                        <h3>{title || defaultTitle}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                    <TableOfContents toc={node.tableOfContents} />
                    </AccordionDetails>
                </Accordion>) :
                <Box p={2}>
                    <TableOfContents toc={node.tableOfContents} />
                </Box>
            }
        </div>
        )
    }
    */

    /*
    .tableOfContents ol {
  margin-bottom: 0em;
}
.tableOfContents h3, h4 {
  margin-bottom: 0em;

}
.tableOfContentsTitle:hover {
  background: #eee;  
  opacity: 70%;
}

    */

export default TableOfContents