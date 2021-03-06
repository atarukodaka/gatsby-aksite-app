
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { paginate } = require('gatsby-awesome-pagination');

const { monthlyArchivePath, directoryArchivePath } = require('./src/utils/archive_path');

const itemsPerPage = 10
const templateDir = "./src/templates"

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
    createTypes(`
        type Mdx implements Node {
            frontmatter: MdxFrontmatter
        }
        type MdxFrontmatter {
            description: String
            cover: File @fileByRelativePath
            series: Series
        }
        type Series {
            title: String
            number: Int
        }
    `);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions

    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode })
        const directory = slug.split("/").slice(1, -2).join("/")
        console.log("create node: ", slug, "[", directory, "]")

        createNodeField({
            node,
            name: 'slug',
            value: slug
        })
        createNodeField({
            node,
            name: 'directory',
            value: directory
        })
        const postTitle = (node.frontmatter.series) ? 
                `${node.frontmatter.series.title}[${node.frontmatter.series.number}] ${node.frontmatter.title}` : 
                node.frontmatter.title
        createNodeField({
            node,
            name: 'postTitle',
            value: postTitle
        })
    }
}
////////////////////////////////////////////////////////////////
// markdown pages
const createMdxPages = ({ nodes, actions }) => {
    console.log("** all markdown pages")
    const { createPage } = actions
    const template = `${templateDir}/post-template.js`
    nodes.forEach(node => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(template),
            context: {
                slug: node.fields.slug,
            },
        })
    })
}
////////////////
// index paginate
const createIndexPagination = ({ nodes, actions }) => {
    console.log("** index paginate")
    const { createPage } = actions
    const template = `${templateDir}/index-template.js`
    console.log("resolve", path.resolve(template), require.resolve(template))
    paginate({
        createPage,
        items: nodes,
        itemsPerPage: itemsPerPage,
        //pathPrefix: ({ pageNumber }) => (pageNumber === 0 ? "/" : "/page"),
        pathPrefix: '/',
        component: path.resolve(template),
    })
}

////////////////
// directory archvies
const createDirectoryArchives = ({ nodes, actions }) => {
    console.log("** creating directory index")
    const { createPage } = actions
    const directories = [...new Set(nodes.map(node => node.fields.directory))]
    directories.forEach(directory => {
        const re = new RegExp(`^${directory}`)
        const items = nodes.filter(node => re.test(node.fields.directory))
        const template = `${templateDir}/directory_archive-template.js`
        paginate({
            createPage,
            items: items,
            itemsPerPage: itemsPerPage,
            //pathPrefix: `/${directory}`,
            pathPrefix: directoryArchivePath(directory),
            component: path.resolve(template),
            context: {
                archive: 'directory',
                directory: directory,
                regex: re.toString(),
                count: nodes.length
            }
        })
    })
}
////////////////
// monthly archive
const createMonthlyArchives = ({ nodes, actions }) => {
    console.log("** creating monthly archives")
    const { createPage } = actions
    const yearMonths = new Set(nodes.filter(v => v.frontmatter.yearmonth).map(node => node.frontmatter.yearmonth))
    //console.log("yearmonths: ", yearMonths)  
    yearMonths.forEach(node => {
        const [year, month] = node.split('-').map(v => parseInt(v))
        const fromDate = new Date(year, month - 1, 1)
        const nextMonth = new Date(year, month, 1)
        const toDate = new Date(nextMonth.getTime() - 1)
        const items = nodes.filter(v => {
            const dt = new Date(v.frontmatter.date); return fromDate <= dt && dt < toDate
        })
        console.log(`monthly archive: ${year}/${month} (${items.length}) [${monthlyArchivePath(year, month)}]`)
        paginate({
            createPage,
            items: items,
            itemsPerPage: itemsPerPage,
            pathPrefix: monthlyArchivePath(year, month),
            component: path.resolve(`${templateDir}/monthly_archive-template.js`),
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
////////////////
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const { data: { mdxPages } } = await graphql(`
    {
        mdxPages: allMdx (sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                id
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                    yearmonth: date(formatString: "YYYY-MM")
                    series { title, number }
                }
                fields {
                    slug, directory
                }
            }            
        }
    }`)

    // create pages
    createMdxPages({ nodes: mdxPages.nodes, actions: { createPage } })
    createIndexPagination({ nodes: mdxPages.nodes, actions: { createPage } })
    createDirectoryArchives({ nodes: mdxPages.nodes, actions: { createPage } })
    createMonthlyArchives({ nodes: mdxPages.nodes, actions: { createPage } })
}
