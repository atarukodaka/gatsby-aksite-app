import React from 'react'
import { useStaticQuery, Link, graphql } from "gatsby"
//import { TreeView, TreeItem } from '@material-ui/lab'
import styles from './sidebar.module.css'
//import { Button } from '@material-ui/core'
//const config = require('../../config')
import DirectoryLabel from './directory_label'

const ListToTree = require('list-to-tree')

const query = graphql`
{
    mdxPages: allMdx {
        nodes {
            id, slug
            fields { directory }
        }
    }
}
`

const DirectoryArchives = () => {
    const data = useStaticQuery(query)

    const list = []
    
    data.mdxPages.nodes.filter(v=>v.fields.directory !== "").forEach(node => {
        const directory = node.fields.directory
        const item = list.find(v => v.name === directory)
        if (item === undefined){
            const parts = directory.split('/')
            //const label = parts.pop()
            //const label = config.directory_labels[`/${parts.join('/')}`] || parts.slice(-1)
            const label = DirectoryLabel(directory).split('/').pop()
            parts.pop()

            //const label = node.fields.directory_name.split('/').pop()
            //parts.pop()
            const parent_dir = parts.join('/')
            const parent = list.find(v => v.name === parent_dir)
            const parent_id = (parent) ? parent.id : 0

            list.push({ id: directory, parent: parent_id, name: directory, label: label, totalCount: 0 })
        }
    })
    
    list.forEach(node=>{
        const re = new RegExp(`^${node.name}`)
        node.totalCount = data.mdxPages.nodes.filter(v=> re.test(v.fields.directory)).length
    })
  
    const tree = new ListToTree(list).GetTree()
    return (
        <Tree nodes={tree} />
    )
}

const Tree = ({ nodes }) => {

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

export default DirectoryArchives