import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import PropTypes from 'prop-types'

import LinkHover from './link_hover'
import DirectoryBox from './directory_box'
import mdxComponents from '../utils/mdx_components'
import ShareSNS from './share_sns'
import styles from "./post.module.css"
import Image from './image'
import Img from 'gatsby-image'


const PostHeader = ({ node }) => (
    <header className={styles.header}>
        <div className={styles.date}>{node.frontmatter.date}</div>
        <h1 className={styles.title}>
            {node.frontmatter.title}
        </h1>

        <DirectoryBox directory={node.fields.directory} />
        {node.frontmatter.featuredImage && (
            <div className="eyecatchImageWrapper">
                { /* <Image filename={node.frontmatter.image} /> */ }
                <Img fluid={node.frontmatter.featuredImage.childImageSharp.fluid}/>
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
                <ShareSNS url={`${data.site.siteMetadata.siteUrl}${pathname}`} 
                  title={node.frontmatter.title} />
            </footer>
        </div>
    )
}

const PostExcerpt = ({ node }) => {
    return (
        <LinkHover to={node.fields.slug}>
            <div className={styles.post}>
                <PostHeader node={node} />
                <main className={styles.excerpt}>
                    {node.excerpt}
                </main>
            </div>
        </LinkHover>
    )
}

export const Post = ({ node, excerptify }) => {
    return (excerptify) ? <PostExcerpt node={node} /> : <PostEntire node={node} />
}


export default Post
