import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

import styles from "./post.module.css"
import directoryLabel from '../utils/directory_label'
import Image from './image'


const query = graphql`
    {
        allMdx {
            nodes {
                id
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")
                    image
                    description
                }
                excerpt
                fields { slug, directory }
            }
        }
    }
`

const PostLink = ({ slug }) => {
    const data = useStaticQuery(query)
    const node = data.allMdx.nodes.find(v => v.fields.slug === slug)
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

const LinkWrapper = ({ to, children }) => (
    <div className={styles.linkWrapper}>
        <Link to={to}>
            {children}
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
            <LinkWrapper to={node.fields.slug}>
                <PostHeader node={node} />
                <main className={styles.excerpt}>
                    {node.excerpt}
                </main>
            </LinkWrapper>
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
            <LinkWrapper to={node.fields.slug}>
                { /* <Link to={node.fields.slug} key={node.id} className={styles.linkWrapper}> */}
                <div className="eyecatchImageSmallWrapper">
                    <Image filename={imgsrc} />
                </div>

                <div className={styles.date}>
                    {node.frontmatter.date}
                </div>
                <div className={styles.postCardTitle}>
                    {node.frontmatter.title}
                </div>
                <DirectoryBox node={node} />
                <div className={styles.excerpt}>
                    {node.frontmatter.description || node.excerpt}
                </div>
                <div style={{ clear: "both" }} />
            </LinkWrapper>
        </div>
    )
}

export default Post
