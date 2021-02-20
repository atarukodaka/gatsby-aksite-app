import React from "react"
import { Link } from 'gatsby'
import { Paper, List, ListItem, ListItemText} from '@material-ui/core'
//import styles from './table_of_contents.module.css'
import Button from '@material-ui/core'

// Table of Contents

const mapStructure = (nodes) => {
    if (nodes) {
        return nodes.map(node=>(
            <ListItem
              key={node.id}
              nestedItems={mapStructure(node.items)}
              />
        ))
    }

}
const TreeList = ({nodes}) => (
    /* {v.items && (<TreeList nodes={v.items}/>)}                */
    <List>
        {
            nodes.map(v=>(
                <>
                <ListItem button key={v.title} nestedItems={TreeList(v.items)}>
                    <ListItemText>{v.title}</ListItemText>
                    
                
                </ListItem>
                
                                </>
            ))
        }

    </List>
)


const Tree = ({nodes}) => (
    
    <ol>
        {
            nodes.map(v=>(
                <>
                <li key={v.title}>
                <Link to={v.url} style={{textDecoration: 'none'}}>{v.title}</Link>
                    
                    
                </li>
                {v.items && (<Tree nodes={v.items}/>)}
                </>
            ))
        }

    </ol>

)
{    /*
    <List>
           <ListItem primaryText="Foo"></ListItem>
        </List>
    */}

const TableOfContents = ( {toc} ) => (


    <Tree nodes={toc.items}/>
    

)



export default TableOfContents