import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import PostCard from './post'

const query = graphql`
    {
        allMdx {
            nodes {
                id, slug
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                    image
                    description
                }
                excerpt
                fields { directory }
            }
        }
    }
`

const PostLink = ( {slug}) => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(v=>v.slug === slug)
    if (node === undefined) { return<div>NO SUCH SLUG: {slug}</div>}

    console.log("postlink node", node)

    return (
        <PostCard node={node}/>
    )
}
export default PostLink