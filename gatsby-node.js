
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `Mdx`) {

        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })

        let directories_array = slug.split(/\//).filter(v => v)
        directories_array.pop()
        const directory = directories_array.join('/')
        createNodeField({
            node,
            name: 'directory',
            value: directory
        })

        //console.log("slug: ", slug)
        //console.log("directory: ", directory)
    }

}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
        const result = await graphql(`
    {
        allMdx {
            nodes {
                fields {
                    slug
                    directory
                }
                frontmatter {
                    date
                }
            
            }
            
        }    
    }`)
    const yearMonths = new Set()

    // markdown pages
    result.data.allMdx.nodes.map(node => {
        console.log(`create markdown page: ${node.fields.slug}`)

        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/post-template.js`),
            context: {
                slug: node.fields.slug,
            },
        })
        //
        //const { year, month } = node.frontmatter
        const dt = new Date(node.frontmatter.date)
        dt.setDate(1)
        yearMonths.add(dt)

    })

    // monthly archives
    
    console.log("** creating monthly archives")
    yearMonths.forEach(yearMonth => {
        //onst { year, month } = yearMonth
        //const year = "2020"
        //const month = "02"
        const year = yearMonth.getFullYear()
        const month = yearMonth.getMonth() + 1
        const fromDate = yearMonth
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1)

        console.log(`  ${year}/${month} archive`)
                
        //).toISOString();

        createPage({
            path: `/archives/${year}/${month.toString().padStart(2, 0)}`,
            component: path.resolve(`./src/templates/archive-template.js`),
            context: {
                archive: 'monthly',
                year: year,
                month: month,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString()
            }
        })
    })
    // directory index
    console.log("** creating directory indecies")
    const directories =
        [...new Set(result.data.allMdx.nodes.map(node => node.fields.directory).
            filter(v => v))]

    console.log("directories: ", directories)

    directories.map(directory => {
        console.log("create directory index: ", directory)
        createPage({
            path: directory,
            component: path.resolve(`./src/templates/directory_index-template.js`),
            context: {
                directory: directory,
            }
        }

        )
    })


}