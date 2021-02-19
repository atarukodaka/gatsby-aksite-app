import React from "react"
import { Link } from 'gatsby'

// Table of Contents
const Tree = ({nodes}) => (
    <ul>
        {
            nodes.map(v=>(
                <li key={v.title}>
                    <Link to={v.url}>{v.title}</Link>
                    {v.items && (<Tree nodes={v.items}/>)}
                </li>
            ))
        }

    </ul>
)
const TableOfContents = ( {toc} ) => (

    <Tree nodes={toc.items}/>

)



export default TableOfContents