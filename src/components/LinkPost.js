import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"
import PropTypes from 'prop-types'

import PostCard from './PostCard'
import Card from './Card'
import HoverBox from './HoverBox'

const query = graphql`
    {
        allMdx {
            nodes {
                ...postFields
            }
        }
    }
`

const LinkPost = ({ to, children, display = "card" }) => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(v => v.fields.slug === to)

    switch (display){
    case "text":
        return (<Link to={to}>{node?.frontmatter?.title || to}</Link>)
    
    default: // card
        if (node === undefined) {
            //return <div>NO SUCH SLUG: {to}</div> 
            return (<HoverBox><Link to={to}><Card>{children}</Card></Link></HoverBox>)
        } else {
            return (<PostCard node={node} />)

        }
    }
}

LinkPost.propTypes = {
    to: PropTypes.string.isRequired
}

export default LinkPost