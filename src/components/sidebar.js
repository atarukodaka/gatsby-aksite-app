import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import { Box } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import MonthlyArchives from './monthly_archives'
import DirectoryArchives from './directory_archives'
//import Divider from '@material-ui/core/Divider'
//import { Paper, Box } from '@material-ui/core'
/*
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight' 
*/
//import { List, ListItem } from '@material-ui/core'
/* import Typography from '@material-ui/core' */
import { PostCard } from './post_card'

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
            frontmatter {
                title, date(formatString: "YYYY-MM-DD"), description
                cover {
                    childImageSharp {
                        fluid(maxWidth: 800){
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }            
            fields { slug, directory }
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

const Card = ( { children } ) => (
    <div style={{boxShadow: "2px 2px 1px rgb(0 0 0 / 20%)", marginBottom: "1rem", paddingBottom: "0.5rem"}}>
        {children}
    </div>
)


const Sidebar = () => {
    const { site, recentPosts } = useStaticQuery(query)

    const twitterUrl = `http://www.twitter.com/${site.siteMetadata.social.twitter}`
    const gitHubUrl = `http://github.com/${site.siteMetadata.social.github}`
    return (
        <div className="sidebar">
            <Card>
                <h3>Profile</h3>
                    <div>Author: {site.siteMetadata.author}</div>
                    <div>
                        <a href={twitterUrl}><TwitterIcon aria-label="button"/></a>
                        <a href={gitHubUrl}><GitHubIcon  aria-label="button"/></a>
                    </div>
            </Card>
            
            <Card>
                <h3>Directories</h3>
                <DirectoryArchives />
            </Card>

            <Card>
                <h3>Recent Posts</h3>
                <RecentPosts nodes={recentPosts.nodes}/>
            </Card>
            
            <Card>
                <h3>Monthly Archives</h3>
                <MonthlyArchives />
            </Card>
        </div>
    )
}

export default Sidebar