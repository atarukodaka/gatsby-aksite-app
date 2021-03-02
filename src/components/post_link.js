import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import PropTypes from 'prop-types'

import PostCard from './post_card'

const query = graphql`
    {
        allMdx {
            nodes {
                id
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                    image
                    description
                }
                excerpt
                fields { slug, directory }
            }
        }
    }
`

const PostLink = ({ slug }) => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(v => v.fields.slug === slug)
    if (node === undefined) { return <div>NO SUCH SLUG: {slug}</div> }

    return (
        <PostCard node={node} />
    )
}

PostLink.propTypes = {
    slug: PropTypes.string.isRequired
}

export default PostLink