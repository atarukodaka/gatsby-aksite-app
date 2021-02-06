
const { createFilePath } = require(`gatsby-source-filesystem`)
const path  = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField }  = actions
   
    if (node.internal.type === `MarkdownRemark`) {
        
        const slug = createFilePath({node, getNode, basePath: `pages`})
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })

        let folders_array = slug.split(/\//).filter( v => v)
        folders_array.pop()
        const folder = folders_array.join('/')
        createNodeField({
            node, 
            name: 'folder',
            value: folder
        })
        
        //console.log("slug: ", slug)
        //console.log("folder: ", folder)
    }

  }

exports.createPages = async ({graphql, actions})  => {
    const { createPage } = actions
    const result = await graphql(`
      {
          allMarkdownRemark {         
                  nodes {
                      fields {
                          slug
                          folder
                      }
                  }
              
          }
      }
    
    `)

    // markdown pages
    result.data.allMarkdownRemark.nodes.map( node => {
        console.log(`create markdown page: ${node.fields.slug}`)
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/post.js`),
            context: {
                slug: node.fields.slug,
            },
        })
    })
    // archives
    createPage( { 
        path: "archive", 
        component: path.resolve(`./src/templates/archive.js`),
        context: {
            slug: "/foo/",
        }
    })
    // folder index
    console.log("** creating folder indecies")
    const folders =
        [...new Set(result.data.allMarkdownRemark.nodes.map( node => node.fields.folder).
            filter(v=>v))]
    
    console.log("folders: ", folders)
 
    folders.map ( folder => {
        console.log("create folder index: ", folder)
        createPage({
            path: folder,
            component: path.resolve(`./src/templates/folder_index.js`),
            context: {
                folder: folder,
            }
        }

        )
    })        

        
}