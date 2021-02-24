import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import MonthlyArchives from './monthly_archives'
import DirectoryArchives from './directory_archives'

//import { Paper, Box } from '@material-ui/core'
/*
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight' 
*/
import { List, ListItem } from '@material-ui/core'
import styles from './sidebar.module.css'
/* import Typography from '@material-ui/core' */
import { PostCard } from './post'
import { TwitterIcon } from "react-share"

const Sidebar = () => {
    const { site, recentPosts } = useStaticQuery(
        graphql`
            {
                site {
                    siteMetadata {
                        title
                        author
                        social { twitter }
                    }                    
                }
                recentPosts: allMdx(
                    limit: 5,
                    sort: {fields: frontmatter___date, order: DESC}
                    ) {
                    nodes {
                        frontmatter { title, date(formatString: "YYYY-MM-DD"), image }
                        slug
                        fields { directory }
                        id
                        excerpt(pruneLength: 100)
                    }
                }
            }

        `
    )
    const twitterUrl = `http://www.twitter.com/${site.siteMetadata.social.twitter}`
    return (
        <div className="sidebar">
            <h3 className={styles.title}>Profile</h3>
            <List>
                <ListItem key="author">Author: {site.siteMetadata.author}</ListItem>
                <ListItem key="twitter">Twitter:<a href={twitterUrl}>{site.siteMetadata.social.twitter}</a></ListItem>
            </List>

            <h3 className={styles.title}>Directories</h3>
            <DirectoryArchives />

            <h3 className={styles.title}>Recent Posts</h3>
            {recentPosts.nodes.map(node => (
                <PostCard node={node} key={node.id}/>
            ))
            }
            <h3 className={styles.title}>Monthly Archives</h3>
            <MonthlyArchives/>
        </div>
    )
}

export default Sidebar