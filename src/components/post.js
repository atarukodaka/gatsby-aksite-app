import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"
import TableOfContents from './table_of_contents'
//import { Paper } from '@material-ui/core'
//import Img from 'gatsby-image'
import { Paper, Grid, Box, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'

const shortcuts = {}


const PostHeader = ({ node }) => (
    <header className={styles.header}>
        <div className={styles.date}>{node.frontmatter.date}</div>
        <h2 className={styles.title}>
            <Link to={'/' + node.slug}>
                {node.frontmatter.title}
            </Link>
        </h2>
        <div className={styles.directory}>
            <Link to={'/' + node.fields.directory}>
                {node.fields.directory}
            </Link>
        </div>

    </header>
)

export const Post = ({ node }) => (
    <div className={styles.post}>
        <PostHeader node={node} />
        <main>
            {node.frontmatter.toc === true && (
                <div  className="tableOfContents">
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary>
                            <h4>Table Of Contents</h4>
                        </AccordionSummary>

                        <AccordionDetails>
                            <TableOfContents toc={node.tableOfContents} />
                        </AccordionDetails>
                    </Accordion>
                    </div>
                )

            }
            <MDXProvider components={shortcuts}>
                <MDXRenderer>
                    {node.body}
                </MDXRenderer>
            </MDXProvider>
        </main>
    </div>

)

export const PostExcerpt = ({ node }) => (
    <div className={styles.post}>
        <PostHeader node={node} />
        <main>
            <div>{node.excerpt}</div>
            <div className={styles.continueReading}>
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
        </main>
    </div>
)


export const PostCard = ({ node, disableLink }) => {
    return (
        <div key={node.id} className={styles.postCard}>
            <div className={styles.postCardDate}>{node.frontmatter.date}</div>
            <h4 className={styles.postCardTitle}>
                { (disableLink) ? node.frontmatter.title : 
                    <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                }
            </h4>
            <div className={styles.postCardDirectory}>{node.fields.directory}</div>
            <div className={styles.postCardExcerpt}>
                {node.excerpt}
            </div>
        </div>
    )
}

export default Post
