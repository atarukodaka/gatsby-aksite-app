
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const { paginate } = require('gatsby-awesome-pagination')


exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        const directory = slug.split("/").slice(0,-2).join("/")
        // add directory field
        console.log("create node fields directory", directory)
        createNodeField({
                node,
                name: 'directory',
                value: directory
            })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data } = await graphql(`
    {
        allMdx {
            nodes {
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                }
                fields {
                    directory
                }
                body
                slug
            }            
        }    
    }`)

    // markdown pages
    data.allMdx.nodes.map(node => {
        console.log(`create markdown page: ${node.slug}`)

        createPage({
            path: node.slug,
            component: path.resolve(`./src/templates/post-template.js`),
            context: {
                node: node,
            },
        })
    })
    // index list
    const itemsPerPage = 10
    paginate({
        createPage,
        items: data.allMdx.nodes,
        itemsPerPage: itemsPerPage,
        pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
        component: path.resolve("./src/templates/index-template.js")
    })

    // directory index
    
    const directory_set = new Set()
    data.allMdx.nodes.map(node => {
        directory_set.add(node.fields.directory)
    })
    console.log("directories: ", directory_set)
    
    const directories = [...directory_set].filter(v=>v)
    directories.map(directory => {
        createPage({
            path: `/${directory}`,
            component: path.resolve(`./src/templates/directory_index-template.js`),
            context: {
                directory: directory
            }
        })
    })

    // monthly archives    
    console.log("** creating monthly archives")
    const yearMonths = new Set()
    data.allMdx.nodes.forEach(node => {
        const dt = new Date(node.frontmatter.date);
        dt.setDate(1);
        yearMonths.add(dt)
    })

    yearMonths.forEach(yearMonth => {
        const year = yearMonth.getFullYear()
        const month = yearMonth.getMonth() + 1
        const fromDate = yearMonth
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1)

        console.log(`  ${year}/${month} archive`)

        createPage({
            path: `/archives/${year}${month.toString().padStart(2, 0)}`,
            component: path.resolve(`./src/templates/archive-template.js`),
            context: {
                archive: 'monthly',
                year: year,
                month: month,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            }
        })
    })

}