import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"
import TableOfContents from './table_of_contents'
//import { Paper } from '@material-ui/core'
//import Img from 'gatsby-image'
import { Paper } from '@material-ui/core'

const shortcuts = {}


const PostHeader = ({ node }) => (
    <header className={styles.header}>
        <div className={styles.date}>{node.frontmatter.date}</div>
        <h1 className={styles.title}>{node.frontmatter.title}</h1>
        <div className={styles.directory}>
            <Link to={'/' + node.fields.directory}>
                {node.fields.directory}
            </Link>
        </div>
       
    </header>

)

const Post = ({ node }) => (
    <div className={styles.post}>
        
        <PostHeader node={node} />
        <h2>toc: {node.frontmatter.toc}</h2>
        <main>
            { node.frontmatter.toc == true && (
            <Paper>
            <h2>Table Of Contents</h2>
            
            <TableOfContents toc={node.tableOfContents}/> 
            </Paper>)
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

export default Post
