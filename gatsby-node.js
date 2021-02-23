
const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)
const { paginate } = require('gatsby-awesome-pagination');

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

        if (node.frontmatter.date) {
            const date = new Date(node.frontmatter.date)
            createNodeField({
                node,
                name: 'yearmonth',
                value: date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, 0)
            })
        }
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data: { mdxPages } } = await graphql(`
    {
        mdxPages: allMdx (sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                }
                fields {
                    directory
                }
                slug
                id
            }            
        }
    }`)

    // markdown pages
    console.log("** all markdown pages")
    mdxPages.nodes.forEach(node => {
        //const siblings = mdxPages.nodes.filter(v => (v.fields.directory === node.fields.directory) && v.slug != node.slug)

        createPage({
            path: node.slug,
            component: path.resolve(`./src/templates/post-template.js`),
            context: {
                slug: node.slug
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
    const directories = [...new Set(mdxPages.nodes.map(node => node.fields.directory ))]
    directories.forEach(directory => {
        const re = new RegExp(`^${directory}`)

        const nodes = mdxPages.nodes.filter(node=>re.test(node.fields.directory))

        paginate({
            createPage,
            items: nodes,
            itemsPerPage: 12,
            pathPrefix: `/${directory}`,
            component: path.resolve(`./src/templates/directory_index-template.js`),
            context: {
                archive: 'directory',
                directory: directory,
                regex: re.toString(),
                count: nodes.length
            }
        })
    })

    console.log("** creating monthly archives")
    const list = []
    mdxPages.nodes.forEach(node=>{
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        if (!list.find(v=> v.year === year && v.month === month)){
            list.push({year: year, month: month})
        }
    })
    console.log(list)
    list.forEach(node=>{
        const fromDate = new Date(node.year, node.month - 1, 1)
        const toDate = new Date(node.year, node.month, 1)
        createPage({
            path: `/archives/${node.year}${node.month.toString().padStart(2, 0)}`,
            component: path.resolve(`./src/templates/archive-template.js`),
            context: {
                archive: 'monthly',
                year: node.year,
                month: node.month,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            }
        })
    })
    /*
    const ym1s = new Map()

   

    mdxPages.nodes.forEach(node => {
        let date = new Date(node.frontmatter.date)
        const k = date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, 0)
        const v = ym1s.get(k) || 0
        ym1s.set(k, v + 1)
    })
    //console.log(ym1s)


    ym1s.forEach(function (v, k) { //} => { //(ym1, count) => {
        const year = parseInt(k.slice(0, 4))
        const month = parseInt(k.slice(5))
        //const count = v
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
                //count: count,
            }
        })
    })
    */
}
