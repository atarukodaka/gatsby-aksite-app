import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"

import LinkableWrapper from './linkable_wrapper'
import DirectoryBox from './directory_box'
import mdxComponents from './mdx_components'
import Share from '../components/share'
import styles from "./post.module.css"
import Image from './image'
//import PostLink from './post_link'


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
    //const shortcodes = {Image, PostLink}
    return (
        <MDXProvider components={mdxComponents}>
            <div className={styles.numbering_headings}>
                <MDXRenderer>
                    {body}
                </MDXRenderer>
            </div>
        </MDXProvider>
    )
}

const query = graphql`
    { site { siteMetadata { siteUrl }} }
`    

const PostEntire = ({ node }) => {
    const data = useStaticQuery(query)
    const { pathname } = useLocation()

    return (
        <div className={styles.post}>
            <PostHeader node={node} />
            <main>
                <RenderMDX body={node.body} />
            </main>
            <footer>
                <Share url={`${data.site.siteMetadata.siteUrl}${pathname}`} 
                  title={node.frontmatter.title} />
            </footer>
        </div>
    )
}

const PostExcerpt = ({ node }) => {
    return (
        <LinkableWrapper to={node.fields.slug}>
            <div className={styles.post}>
                <PostHeader node={node} />
                <main className={styles.excerpt}>
                    {node.excerpt}
                </main>
            </div>
        </LinkableWrapper>
    )
}

export const Post = ({ node, excerptify }) => {
    return (excerptify) ? <PostExcerpt node={node} /> : <PostEntire node={node} />
}

export default Post
