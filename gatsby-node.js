
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const { paginate }= require('gatsby-awesome-pagination')


exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data  } = await graphql(`
    {
        allMdx {
            nodes {
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
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