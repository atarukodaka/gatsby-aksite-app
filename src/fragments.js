import { graphql } from 'gatsby'

export const postFields = graphql`
fragment postFields on Mdx {
  id
  excerpt(pruneLength: 200)
  frontmatter {
    date(formatString: "YYYY-MM-DD"), title, description
    cover {
      childImageSharp {
        fluid(maxWidth: 800) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }        
  fields { 
    slug, directory
  }
  tableOfContents
}
`
