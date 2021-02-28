import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"
//import TableOfContents from './table_of_contents'
//import Img from 'gatsby-image'
//import { Box, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import directoryLabel from '../utils/directory_label'
import Image from './image'


const query = graphql`
    {
        allMdx {
            nodes {
                id, slug
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                    image
                    description
                }
                excerpt
                fields { directory }
            }
        }
    }
`

const PostLink = ({ slug }) => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(v => v.slug === slug)
    if (node === undefined) { return <div>NO SUCH SLUG: {slug}</div> }

    //console.log("postlink node", node)

    return (
        <PostCard node={node} />
    )
}

const DirectoryBox = ({ node }) => (
    <div className={styles.directory}>
        <Link to={'/' + node.fields.directory}>
            {directoryLabel(node.fields.directory)}
        </Link>
    </div>

)

const PostHeader = ({ node }) => (
    <header className={styles.header}>
        <div className={styles.date}>{node.frontmatter.date}</div>
        <h1 className={styles.title}>
            {node.frontmatter.title}
        </h1>

        <DirectoryBox node={node} />
        {node.frontmatter.image && (
            <div className="eyecatchImageWrapper">
                <Image filename={node.frontmatter.image} />
                { /* <Img fluid={node.frontmatter.image.childImageSharp.fluid}/> */}
            </div>
        )}
        <div className={styles.description}>
            {node.frontmatter.description}
        </div>
    </header>
)
/*
const TocBox = ({ node, title, useAccordion }) => {
    const defaultTitle = "Table of Contents"

    return (
        <div className={styles.tableOfContents}>
            { (useAccordion) ?
                (<Accordion defaultExpanded={true}>
                    <AccordionSummary>
                        <h3>{title || defaultTitle}</h3>
                    </AccordionSummary>
                    <AccordionDetails>
                    <TableOfContents toc={node.tableOfContents} />
                    </AccordionDetails>
                </Accordion>) :
                <Box p={2}>
                    <TableOfContents toc={node.tableOfContents} />
                </Box>
            }
        </div>
        )
    }
    */

const RenderMDX = ({ body }) => {
    const shortcuts = { Image, PostLink }
    return (
        <MDXProvider components={shortcuts}>
            <div className={styles.numbering_headings}>
                <MDXRenderer>
                    {body}
                </MDXRenderer>
            </div>
        </MDXProvider>
    )
}

const PostEntire = ({ node }) => {
    return (
        <div className={styles.post}>
            <PostHeader node={node} />
            <main>
                <RenderMDX body={node.body} />
            </main>
        </div>
    )
}


const PostExcerpt = ({ node }) => {
    return (
        <div className={styles.post}>
            <Link to={'/' + node.slug} className={styles.postexcerpt}>
                <PostHeader node={node} />
                <main>
                    {node.excerpt}
                </main>
            </Link>
        </div>
    )
}

export const Post = ({ node, excerptify }) => {
    return (excerptify) ? <PostExcerpt node={node} /> : <PostEntire node={node} />
}

export const PostCard = ({ node }) => {
    const noImageAvailable = "no_image_available.png"
    const imgsrc = node.frontmatter.image || noImageAvailable
    return (
        <div className={styles.postCard}>
            <Link to={'/' + node.slug} key={node.id}>
                <div className="eyecatchImageSmallWrapper">
                    <Image filename={imgsrc} />
                </div>

                <div className={styles.postCardDate}>
                    {node.frontmatter.date}
                </div>
                <div className={styles.postCardTitle}>
                    {node.frontmatter.title}
                </div>
                <DirectoryBox node={node} />
                <div className={styles.postCardExcerpt}>
                    {node.frontmatter.description || node.excerpt}
                </div>
                <div style={{ clear: "both" }} />
            </Link>
        </div>
    )
}

export default Post
