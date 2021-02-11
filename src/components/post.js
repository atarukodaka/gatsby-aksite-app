import React from "react"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"

const PostTitle = ({node}) => (
    <h2 className={styles.title}>
        {node.frontmatter.title || node.slug}
    </h2>
)
const PostTitleExcerpt = ({node}) => (
    <h3 className={styles.title}>
        <Link to={'/' + node.slug}>{node.frontmatter.title || node.slug}</Link>
    </h3>
)
const LinkToDirectory = ({ node }) => (
    <Link to={'/' + node.fields.directory}>
    {node.fields.directory}
    </Link>

)
const PostInfo = ({ node }) => (
    <div className={styles.postInfo}>
        | 
        <LinkToDirectory node={node}/> |
        {node.frontmatter.date}
         |
    </div>
)
const PostContinueReading = ({node}) => {

    const text = "continue reading..."
    return (
    <div className={styles.continueReading}>
        <Link to={'/' + node.slug}>{text}</Link>
    </div>
)}

const Post = ({ node }) => {
    return (
        <div className="post">
            <PostTitle node={node}/>
            <PostInfo node={node} />

            <MDXRenderer>
                {node.body}
            </MDXRenderer>
        </div>
    )
}

export const PostExcerpt = ({ node }) => {
    return (
        <div>
            <PostTitleExcerpt node={node}/>
            <PostInfo node={node} />

            <div>{node.excerpt}</div>
            <PostContinueReading node={node}/>
        </div>
    )
}

export default Post
