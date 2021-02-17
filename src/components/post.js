import React from "react"
import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"
import { Paper } from '@material-ui/core'

const shortcuts = {}


const PostTitle = ({ node }) => (
    <h2 className={styles.title}>
        {node.frontmatter.title || node.slug}
    </h2>
)
const PostTitleExcerpt = ({ node }) => (
    <h3 className={styles.title}>
        <Link to={'/' + node.slug}>{node.frontmatter.title || node.slug}</Link>
    </h3>
)
const PostInfo = ({ node }) => (
    <div className={styles.postInfo}>
        |
        <Link to={'/' + node.fields.directory}>
            {node.fields.directory}
        </Link>
        |
        {node.frontmatter.date}
         |
    </div>
)

const PostHeader = ({node}) => (
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

const Post = ({ node }) => {
    return (
        <div className={styles.post}>
            <PostHeader node={node}/>
            <main>
                <MDXProvider components={shortcuts}>
                    <MDXRenderer>
                        {node.body}
                    </MDXRenderer>
                </MDXProvider>
            </main>
        </div>

    )
}

export const PostExcerpt = ({node}) => (
    <div className={styles.post}>
        <PostHeader node={node}/>
        <main>
            <div>{node.excerpt}</div>
            <div className={styles.continueReading}>
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
        </main>
    </div>
)

export const PostExcerptqqq = ({ node }) => {
    return (
        <Paper className={styles.excerpt}>
            <PostTitleExcerpt node={node} />
            <PostInfo node={node} />

            <div>
                {node.excerpt}
            </div>
            <div className={styles.continueReading}>
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
        </Paper>
    )
}

export default Post
