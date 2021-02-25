import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Grid } from '@material-ui/core'

import { PostCard } from './post'

const Siblings = ({ node }) => {
    const data = useStaticQuery(graphql`
    {
      allMdx {
        nodes {
          id
          slug
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            image
            description
          }
          fields { directory }
          excerpt(pruneLength: 100)
        }
      }
    }
    `)
    const siblings = data.allMdx.nodes.filter(v=> (v.fields.directory === node.fields.directory) && v.slug !== node.slug)
    const numberShow = 9
    return (
      <nav>
        <Grid container spacing={3}>
          { siblings.slice(0, numberShow).map(v =>
            (<Grid item xs={12} sm={6} md={4} key={v.id}><PostCard node={v} /></Grid>))}
  
        </Grid>
      </nav>
    )
  }

  export default Siblings