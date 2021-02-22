
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const { paginate } = require('gatsby-awesome-pagination')
const { findDOMNode } = require('react-dom')
const config = require(`./config`)

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
    createTypes(`
      type Mdx implements Node {
        frontmatter: MdxFrontmatter
      }
  
      type MdxFrontmatter {
        toc: Boolean
      }
    `);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        const directory = slug.split("/").slice(1, -2).join("/")
        // add directory field
        //console.log("create node fields directory", directory)
        
        createNodeField({
            node,
            name: 'directory',
            value: directory
        })
        createNodeField({
            node,
            name: 'directory_name',
            value: config.directory_names[directory] || directory,
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data: { mdxPages, directories, sibling_nodes } } = await graphql(`
    {
        mdxPages: allMdx (sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                    toc
                    image
                }
                fields {
                    directory, directory_name
                }
                body
                slug
                tableOfContents
                id
            }            
        }
        sibling_nodes: allMdx  (sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    title, date(formatString: "YYYY-MM-DD")
                }
                fields { directory, directory_name }
                id
                slug
                excerpt(pruneLength: 200)
            }
        }
        directories: allMdx(filter: {fields: {directory: {ne: ""}}}) {
            group(field: fields___directory) {
              directory: fieldValue
              totalCount
            }
        }
    }`)

    // markdown pages
    console.log("** all markdown pages")
    mdxPages.nodes.forEach(node => {
        //console.log(`create markdown page: ${node.slug}`)
        const siblings = sibling_nodes.nodes.filter(v=> (v.fields.directory === node.fields.directory) && v.slug != node.slug )
                
        createPage({
            path: node.slug,
            component: path.resolve(`./src/templates/post-template.js`),
            context: {
                node: node,
                siblings: siblings,
            },
        })
    })
    // index paginate
    console.log("** index paginate")
    const itemsPerPage = 10
    paginate({
        createPage,
        items: mdxPages.nodes,
        itemsPerPage: itemsPerPage,
        //pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
        pathPrefix: '/',
        component: path.resolve("./src/templates/index-template.js")
    })

    // directory index   
    console.log("** creating directory index")

    directories.group.forEach(({ directory, totalCount }) => {
        //console.log(directory)
        const re = new RegExp(`^${directory}`)
        const count = mdxPages.nodes.filter(node=> re.test(node.fields.directory)).length
        console.log("directory count: ", directory, count)
        //const directory_name = (config.directory_names[directory]) ? config.directory_names[directory].split('/').pop() : directory
        const directory_name = config.directory_names[directory] || directory
            
        createPage({
            path: `/${directory}`,
            component: path.resolve(`./src/templates/directory_index-template.js`),
            context: {
                archive: 'directory',
                directory: directory,
                directory_name: directory_name,
                regex: `/^${directory}/`,
                count: count,
            }
        })
    })

    // monthly archives    
    console.log("** creating monthly archives")
    const ym1s = new Map()

    mdxPages.nodes.forEach(node => {
        let date = new Date(node.frontmatter.date)
        const k = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, 0)
        const v = ym1s.get(k) || 0
        ym1s.set(k, v + 1)
    })
    //console.log(ym1s)

    /*
    const dates = mdxPages.nodes.map(node=>new Date(node.frontmatter.date))
    const ym1s = dates.filter((date, i, self) => 
        self.findIndex(d => 
            (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth())
        ) === i)
    */
    ym1s.forEach(function (v, k) { //} => { //(ym1, count) => {
        const year = parseInt(k.slice(0, 4))
        const month = parseInt(k.slice(5))
        const count = v
        const fromDate = new Date(year, month - 1, 1)
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1)

        //console.log(`${year}/${month}`)
        createPage({
            path: `/archives/${year}${month.toString().padStart(2, 0)}`,
            component: path.resolve(`./src/templates/archive-template.js`),
            context: {
                archive: 'monthly',
                year: year,
                month: month,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
                count: count,
            }
        })
    })
}
