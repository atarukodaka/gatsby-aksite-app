import React from 'react'
import { useStaticQuery, Link, graphql, navigate } from "gatsby"
//import { TreeView, TreeItem } from '@material-ui/lab'
import styles from './sidebar.module.css'
import { Button } from '@material-ui/core'

const ListToTree = require('list-to-tree')

const DirectoryArchives = () => {

    const data = useStaticQuery(
        graphql`
        {
            mdxPages: allMdx {
                nodes {
                    id, slug
                    fields { directory, directory_name }
                }
            }
   
        directoryArchives: allSitePage(filter: {context: {archive: {eq: "directory"}}}) {
            nodes {
              id
              path
              context {
                directory
                directory_name
                count
              }
            }
          }
        }
        `)


    const list = []
    data.mdxPages.nodes.filter(v=>v.fields.directory != "").map(node => {
        const directory = node.fields.directory
        const item = list.find(v => v.name == directory)
        if (item === undefined){
            const parts = directory.split('/')
            //const label = parts.pop() || directory
            const label = node.fields.directory_name.split('/').pop()
            parts.pop()
            const parent_dir = parts.join('/')
            const parent = list.find(v => v.name == parent_dir)
            const parent_id = (parent) ? parent.id : 0

            list.push({ id: directory, parent: parent_id, name: directory, label: label, totalCount: 0 })
        }
    })
    
    list.forEach(node=>{
        const re = new RegExp(`^${node.name}`)
        node.totalCount = data.mdxPages.nodes.filter(v=> re.test(v.fields.directory)).length
    })
    /*
    directoryArchives.nodes.forEach(node => {
        const parts = node.context.directory.split('/')
        const label1 = parts.pop() || node.context.directory
        const label = node.context.directory_name.split('/').pop()
        const parent_dir = parts.join('/')
        const parent = list.find(vv => vv.name === parent_dir)
        const parent_id = (parent) ? parent.id : 0

        list.push({ id: node.context.directory, parent: parent_id, name: node.context.directory, label: label, totalCount: node.context.count })
    })
    */
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