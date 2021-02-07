
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {

        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })

        let folders_array = slug.split(/\//).filter(v => v)
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

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    //allMarkdownRemark(filter: {frontmatter: {published: {ne: false}}}) {         
    const result = await graphql(`
    {
        allMarkdownRemark {
            nodes {
                fields {
                    slug
                    folder
                }
                frontmatter {
                    date
                }
            
            }
            
        }    
    }`)
    const yearMonths = new Set()

    // markdown pages
    result.data.allMarkdownRemark.nodes.map(node => {
        console.log(`create markdown page: ${node.fields.slug}`)

        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/post.js`),
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
            component: path.resolve(`./src/templates/archive.js`),
            context: {
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString()
            }
        })
    })
    // folder index
    console.log("** creating folder indecies")
    const folders =
        [...new Set(result.data.allMarkdownRemark.nodes.map(node => node.fields.folder).
            filter(v => v))]

    console.log("folders: ", folders)

    folders.map(folder => {
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