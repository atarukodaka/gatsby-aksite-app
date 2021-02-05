
const { createFilePath } = require(`gatsby-source-filesystem`)
const path  = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField} = actions
    //console.log(actions)
    //console.log(node)
    if (node.internal.type === `MarkdownRemark`) {
        //const fileNode = getNode(node.parent)
        const slug = createFilePath({node, getNode, basePath: `pages`})
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
        console.log(slug)

        //console.log('\n', fileNode.relativePath)
      
    }
  }

exports.createPages = async ({graphql, actions})  => {
    const { createPage } = actions
    const result = await graphql(`
      query {
          allMarkdownRemark {
              edges {
                  node {
                      fields {
                          slug
                      }
                  }
              }
          }
      }
    
    `)
    createPage( { 
        path: "archive", 
        component: path.resolve(`./src/templates/archive.js`),
        context: {
            slug: "/foo/",
        }
    })
    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        console.log(`create node: ${node.fields.slug}`)
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/post.js`),
            context: {

                slug: node.fields.slug,
            },
        })
    })
    

}