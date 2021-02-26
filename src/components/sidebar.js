import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Box } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import MonthlyArchives from './monthly_archives'
import DirectoryArchives from './directory_archives'

//import { Paper, Box } from '@material-ui/core'
/*
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight' 
*/
import { List, ListItem } from '@material-ui/core'
/* import Typography from '@material-ui/core' */
import { PostCard } from './post'

const query = graphql`
{
    site {
        siteMetadata {
            title
            author
            social { twitter, github }
        }                    
    }
    recentPosts: allMdx(
        limit: 5,
        sort: {fields: frontmatter___date, order: DESC}
        ) {
        nodes {
            frontmatter { title, date(formatString: "YYYY-MM-DD"), image, description }
            slug
            fields { directory }
            id
            excerpt(pruneLength: 100)
        }
    }
}
`

const RecentPosts = ( { nodes} ) => {
    return (<nav>
        {nodes.map(node => (
            <PostCard node={node} key={node.id} />
        ))}
    </nav>)
}

const Sidebar = () => {
    const { site, recentPosts } = useStaticQuery(query)

    const twitterUrl = `http://www.twitter.com/${site.siteMetadata.social.twitter}`
    const gitHubUrl = `http://github.com/${site.siteMetadata.social.github}`
    return (
        <div className="sidebar">
            <div>
                <h3>Profile</h3>
                <List>
                    <ListItem>Author: {site.siteMetadata.author}</ListItem>
                    <ListItem>
                        <Box m={1}><a href={twitterUrl}><TwitterIcon label="button"/></a></Box>
                        <Box m={1}><a href={gitHubUrl}><GitHubIcon  role="button"/></a></Box>
                    </ListItem>
                </List>
            </div>

            <div>
                <h3>Directories</h3>
                <DirectoryArchives />
            </div>
            <div>
                <h3>Recent Posts</h3>
                <RecentPosts nodes={recentPosts.nodes}/>
               
            </div>
            <div>
                <h3>Monthly Archives</h3>
                <MonthlyArchives />
            </div>
        </div>
    )
}

export default Sidebar