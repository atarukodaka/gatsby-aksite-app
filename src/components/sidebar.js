import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Paper } from '@material-ui/core'
import { TreeView, TreeItem } from '@material-ui/lab'
import MonthlyArchives from './monthly_archives'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const ListToTree = require('list-to-tree')

const Tree = ({ nodes }) => {
    return (
    <ul>
        {
            nodes.map(v => (
                    <li key={v.name}><Link to={'/' + v.name}>{v.label || v.name} ({v.totalCount})</Link>
                    { ( v.child ) ? <Tree nodes={v.child}></Tree> : '' }
                    </li>
                )
            )
        }
    </ul>)
}
const Tree2 = ({ nodes }) => {
    return (
    <TreeView  defaultCollapseIcon={<ExpandMoreIcon />}
    defaultExpandIcon={<ChevronRightIcon />}>
        {
            nodes.map(v => (
                    <TreeItem nodeId={v.name} label={v.name}>
                    { ( v.child ) ? <Tree nodes={v.child}></Tree> : '' }
                    </TreeItem>
                )
            )
        }
    </TreeView>)
}

const Sidebar = () => {
    const { site, directories, recentPosts } = useStaticQuery(
        graphql`
            {
                site {
                    siteMetadata {
                        title
                        author
                    }                    
                }

                directories: allMdx(sort: {fields: fields___directory, order: ASC}, filter: {fields: {directory: {ne: ""}}}) {
                    group(field: fields___directory) {
                      directory: fieldValue
                      totalCount
                    }
                }
                recentPosts: allMdx(
                    limit: 10,
                    sort: {fields: frontmatter___date, order: DESC}
                    ) {
                    nodes {
                        frontmatter { title, date(formatString: "YYYY-MM-DD") }
                        slug
                        fields { directory }
                        id
                    }
                }
            }

        `
    )

    let i = 1
    const list = []
    directories.group.forEach(v=> {
        const parts = v.directory.split('/')
        const label = parts.pop() || v.directory
        const parent_dir = parts.join('/')
        const parent = list.find(vv => vv.name === parent_dir)
        const parent_id = (parent) ? parent.id : 0
        
        list.push({ id: i, parent: parent_id, name: v.directory, label: label, totalCount: v.totalCount})
        i = i + 1
    }
    )
    //console.log(list)

    const tree = new ListToTree(list).GetTree()
    //console.log(tree)
    return (
        <div className="sidebar">
   
            <h3>Profile</h3>
            <ul>
                <li key="author">{site.siteMetadata.author}</li>
                <li key="description">{site.siteMetadata.descriptino}</li>
            </ul>

            <h3>Recent Posts</h3>
            <ul>
                {
                    recentPosts.nodes.map(node => (
                        <li key={node.id}>
                            <Link to={'/' + node.slug}>{node.frontmatter.title}</Link> ({node.frontmatter.date})
                        </li>
                    ))
                }
            </ul>
            <h3>Directories</h3>

            <Tree nodes={tree} />
            
            <h3>Monthly Archives</h3>
            <MonthlyArchives/>
          
        </div>
    )
}

export default Sidebar