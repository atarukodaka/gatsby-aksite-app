import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import PostCard from './PostCard'

const query = graphql`
{
    recentPosts: allMdx(
        limit: 5,
        sort: {fields: frontmatter___date, order: DESC}
        ) {
        nodes {
            ...postFields
        }
    }
}
`

const RecentPosts = (  ) => {
    const { recentPosts } = useStaticQuery(query)

    return (<nav>
        {recentPosts.nodes.map(node => (
            <PostCard node={node} key={node.id} />
        ))}
    </nav>)
}

export default RecentPosts
