import { graphql } from 'gatsby'

console.log("fragments.js loaded")

export const postFields = graphql`
fragment postFields on Mdx {
  id
  excerpt(pruneLength: 100)
  frontmatter {
    date(formatString: "YYYY-MM-DD"), title, description
    cover {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    series {
      title
      number
    }
  }        
  fields { 
    slug, directory, postTitle
  }
  tableOfContents
}

fragment postFieldsBody on Mdx {
    ...postFields
    body
}

fragment siteInformation on Site {
    siteMetadata {
        title
        author
        description
        coverImage
        social { twitter, github }
    }
}
`
