import React from "react"
import { useStaticQuery, Link, graphql, navigate } from "gatsby"
import MonthlyArchives from './monthly_archives'
import DirectoryArchives from './directory_archives'

import { Paper, Box } from '@material-ui/core'
/*
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight' */
import { List, ListItem } from '@material-ui/core'
import styles from './sidebar.module.css'
/* import Typography from '@material-ui/core' */

const Sidebar = () => {
    const { site,  recentPosts } = useStaticQuery(
        graphql`
            {
                site {
                    siteMetadata {
                        title
                        author
                    }                    
                }

                recentPosts: allMdx(
                    limit: 5,
                    sort: {fields: frontmatter___date, order: DESC}
                    ) {
                    nodes {
                        frontmatter { title, date(formatString: "YYYY-MM-DD") }
                        slug
                        fields { directory }
                        id
                        excerpt(pruneLength: 100)
                    }
                }
            }

        `
    )
/*
    const list = []
    directoryArchives.nodes.forEach(node =>{
        const parts = node.context.directory.split('/')
        const label = parts.pop() || node.context.directory
        const parent_dir = parts.join('/')
        const parent = list.find(vv => vv.name === parent_dir)
        const parent_id = (parent) ? parent.id : 0
                
        list.push({id: node.context.directory, parent: parent_id, name: node.context.directory, label: label, totalCount: node.context.count})
    })
 

    const tree = new ListToTree(list).GetTree()
    */
    //console.log(tree)
    return (
        <div className="sidebar">
   
            <h3 className={styles.title}>Profile</h3>
            <List>
                <ListItem key="author">{site.siteMetadata.author}</ListItem>
                <ListItem key="description">{site.siteMetadata.descriptino}</ListItem>
            </List>

            <h3 className={styles.title}>Recent Posts</h3>
                {recentPosts.nodes.map(node => (
                    <Paper key={node.id} className={styles.recentPost}>
                        <div className={styles.recentPostDate}>{node.frontmatter.date}</div>
                        <h4 variant="h4" className={styles.recentPostTitle}>
                            <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                        </h4>
                        <div className={styles.recentPostDirectory}>{node.fields.directory}</div>
                        <div className={styles.recentPostExcerpt}>
                            {node.excerpt}
                        </div>

                    </Paper>
                ))
                }
            <h3 className={styles.title}>Directories</h3>
            <DirectoryArchives/>

            <h3 className={styles.title}>Monthly Archives</h3>
            <MonthlyArchives/>
          
        </div>
    )
}

export default Sidebar