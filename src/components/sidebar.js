import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import { Box } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import MonthlyArchives from './monthly_archives'
import DirectoryArchives from './directory_archives'
import Divider from '@material-ui/core/Divider'
//import { Paper, Box } from '@material-ui/core'
/*
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight' 
*/
//import { List, ListItem } from '@material-ui/core'
/* import Typography from '@material-ui/core' */
import { PostCard } from './post'
import SearchBox from './search_box'
import ClientOnly from './client_only'

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
            <ClientOnly>
                <SearchBox/>
            </ClientOnly>

            <div>
                <h3>Profile</h3>

                    <div>Author: {site.siteMetadata.author}</div>
                    <div>
                        <a href={twitterUrl}><TwitterIcon aria-label="button"/></a>
                        <a href={gitHubUrl}><GitHubIcon  aria-label="button"/></a>
                    </div>
            </div>
            <Divider/>
            <div>
                <h3>Directories</h3>
                <DirectoryArchives />
            </div>
            <Divider/>
            <div>
                <h3>Recent Posts</h3>
                <RecentPosts nodes={recentPosts.nodes}/>
            </div>
            <Divider/>
            <div>
                <h3>Monthly Archives</h3>
                <MonthlyArchives />
            </div>
        </div>
    )
}

export default Sidebar