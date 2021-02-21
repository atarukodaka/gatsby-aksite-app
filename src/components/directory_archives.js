import React from 'react'
import { useStaticQuery, Link, graphql, navigate } from "gatsby"
//import { TreeView, TreeItem } from '@material-ui/lab'
import styles from './sidebar.module.css'
import { Button } from '@material-ui/core'

const ListToTree = require('list-to-tree')

const DirectoryArchives = () => {
    const { directoryArchives } = useStaticQuery(
        graphql`
        {
        directoryArchives: allSitePage(filter: {context: {archive: {eq: "directory"}}}) {
            nodes {
              id
              path
              context {
                directory
                count
              }
            }
          }
        }
        `)

    const list = []
    directoryArchives.nodes.forEach(node => {
        const parts = node.context.directory.split('/')
        const label = parts.pop() || node.context.directory
        const parent_dir = parts.join('/')
        const parent = list.find(vv => vv.name === parent_dir)
        const parent_id = (parent) ? parent.id : 0

        list.push({ id: node.context.directory, parent: parent_id, name: node.context.directory, label: label, totalCount: node.context.count })
    })
    const tree = new ListToTree(list).GetTree()
    return (
        <Tree nodes={tree} />
    )
}

const Tree = ({ nodes }) => {
    /*                        */

    /*
                    
*/
    return (
        <ul className={styles.tree}>
            {
                nodes.map(v => (
                        <li key={v.id} className="directory">
                            <Link to={'/' + v.name}>{v.label || v.name} ({v.totalCount})</Link>                        
                            { v.child && (<Tree nodes={v.child}></Tree>)}
                        </li>
                    )
                )
            }
        </ul>)
}
/*
const handleClick = (node) => {
    //alert(node.name)
    //navigate('/' + node.name)
    navigate(node.path)
}
const TreeNodes = ({ nodes }) => {
    return (
        <div>
        {
            nodes.map(v => (
                    <TreeItem nodeId={v.name} label={v.label + ' ('+ v.totalCount+ ')'} onLabelClick={()=> { handleClick(v)}}>
                    { ( v.child ) ? <TreeNodes nodes={v.child}/> : '' }
                    </TreeItem>
                )
            )
        }
        </div>
    )
}
*/

export default DirectoryArchives