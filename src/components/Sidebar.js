import React from "react"
import { useStaticQuery, graphql } from "gatsby"
//import { Box } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

import MonthlyArchives from './MonthlyArchives'
import DirectoryTree from './DirectoryTree'
import Card from './Card'
import RecentPosts from './RecentPosts'

const query = graphql`
{
    site {
        ...siteInformation               
    }
    allMdx {
        nodes { ...postFields }
    }
}
`



const Profile = () => {
    const { site } = useStaticQuery(query)
    const twitterUrl = `http://www.twitter.com/${site.siteMetadata.social.twitter}`
    const gitHubUrl = `http://github.com/${site.siteMetadata.social.github}`

    return (
        <div>
            <div>Author: {site.siteMetadata.author}</div>
            <div>
                <a href={twitterUrl}><TwitterIcon aria-label="button" /></a>
                <a href={gitHubUrl}><GitHubIcon aria-label="button" /></a>
            </div>
        </div>
    )
}
const Sidebar = () => {
    return (
        <div className="sidebar">
            <Card>
                <h3>Profile</h3>
                <Profile/>
            </Card>

            <Card>
                <h3>Directories</h3>
                <DirectoryTree />
            </Card>

            <Card>
                <h3>Recent Posts</h3>
                <RecentPosts />
            </Card>

            <Card>
                <h3>Monthly Archives</h3>
                <MonthlyArchives />
            </Card>
        </div>
    )
}

export default Sidebar