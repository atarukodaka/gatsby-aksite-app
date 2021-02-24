import React from "react"
import { Link, useStaticQuery } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"
import TableOfContents from './table_of_contents'
import Img from 'gatsby-image'
import { Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import DirectoryLabel from './directory_label'
import Image from './image'

const shortcuts = {}

const PostHeader = ({ node }) => (
    <header className={styles.header}>
        <div className={styles.date}>{node.frontmatter.date}</div>
        <h1 className={styles.title}>
            <Link to={'/' + node.slug}>
                {node.frontmatter.title}
            </Link>
        </h1>
        <div className={styles.directory}>
            <Link to={'/' + node.fields.directory}>
                {DirectoryLabel(node.fields.directory)}
            </Link>
        </div>

        { node.frontmatter.image && (
            <div className="eyecatchImageWrapper">
                <Image filename={node.frontmatter.image}/>
            </div>
        )}
    </header>
)

const TocBox = ({ node }) => (

    <div className={styles.tableOfContents}>
    <Accordion defaultExpanded={true} >
        
            <AccordionSummary>
                <h3>Table Of Contents</h3>
            </AccordionSummary>

            <AccordionDetails>
              <TableOfContents toc={node.tableOfContents} />
            </AccordionDetails>
        
    </Accordion>
    </div>
)

export const Post = ({ node }) => (
    <div className={styles.post}>
        <PostHeader node={node} />
        <main>
            {node.frontmatter.toc === true && (<TocBox node={node} />)}

            <MDXProvider components={shortcuts}>
                <div className={styles.numbering_headings}>
                    <MDXRenderer>
                        {node.body}
                    </MDXRenderer>
                </div>
            </MDXProvider>

        </main>
    </div>
)

export const PostExcerpt = ({ node }) => (
    <div className={styles.post}>
        <PostHeader node={node} />
        <main>
            { /* node.frontmatter.image && (<img src={node.frontmatter.image} className="eyecatchImageSmall"></img>) */}
            <div className={styles.excerpt}>{node.excerpt}</div>
            <div className={styles.continueReading}>
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
        </main>
    </div>
)


export const PostCard = ({ node, disableLink, showExcerpt }) => {
    if (showExcerpt === undefined) { showExcerpt = true }

    const noImageAvailable = "no_image_available.png"
    const imgsrc = node.frontmatter.image || noImageAvailable
    return (
        <div className={styles.postCard}>
            <Link to={'/' + node.slug} key={node.id}>
                <div>
                    <div className="eyecatchImageSmallWrapper">
                        <Image filename={imgsrc}/>
                    </div>
                    { /* <img src={imgsrc} className="eyecatchImageSmall" alt="post card alt" /> */ }
                    { /* { node.frontmatter.image && (<img src={imgsrc} className="eyecatchImageSmall" alt="eye catch image"/>) } */}

                </div>

                <div className={styles.postCardDate}>{node.frontmatter.date}</div>
                <h4 className={styles.postCardTitle}>
                    {(disableLink) ? node.frontmatter.title :
                        <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                    }
                </h4>
                <div className={styles.postCardDirectory}>
                    <Link to={'/' + node.fields.directory}>{DirectoryLabel(node.fields.directory)}</Link>
                </div>
                {showExcerpt && (
                    <div className={styles.postCardExcerpt}>
                        {node.excerpt}
                    </div>

                )}
                <div style={{ clear: "both" }} />
            </Link>
        </div>
    )
}

export const PostCards = ({ nodes, showExcerpt }) => {
    return (
        <Grid container spacing={3}>
            {
                nodes.map(node => (
                    <Grid item xs={12} sm={6} md={4} key={node.id}>
                        <PostCard node={node} showExcerpt={showExcerpt} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
export default Post
