import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styles from "./post.module.css"
//import TableOfContents from './table_of_contents'
//import Img from 'gatsby-image'
import { Box, Grid, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import directoryLabel from '../utils/directory_label'
import Image from './image'
import PostLink from './post_link'


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
                {directoryLabel(node.fields.directory)}
            </Link>
        </div>

        { node.frontmatter.image && (
            <div className="eyecatchImageWrapper">
                <Image filename={node.frontmatter.image}/>
                { /* <Img fluid={node.frontmatter.image.childImageSharp.fluid}/> */ }
            </div>
        )}
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



export const Post = ({ node }) => {
    const shortcuts = { Image, PostLink }
    return (
    <div className={styles.post}>
        <PostHeader node={node} />
        <main>
            <div className={styles.description}>
                {node.frontmatter.description}                
            </div>
    
            { /* node.frontmatter.toc === true && (<TocBox node={node} />) */}
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
}

export const PostExcerpt = ({ node }) => (
    <div className={styles.postexcerpt}>
        <Link to={'/' + node.slug}>
        <PostHeader node={node} />
        <main>
            { node.frontmatter.description && (<div className={styles.description}>{ node.frontmatter.description}</div>)}
            { /* node.frontmatter.image && (<img src={node.frontmatter.image} className="eyecatchImageSmall"></img>) */}
            { /* node.tableOfContents?.items && 
            (<div className={styles.tableOfContents}>
                <TableOfContents toc={node.tableOfContents} />
             </div>
            ) */
            }
            
            <div className={styles.excerpt}>{node.excerpt}</div>
            { /* <div className={styles.continueReading}>
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
            */ }
        </main>
        </Link>
    </div>
)

export const PostCard = ({ node }) => {

    const noImageAvailable = "no_image_available.png"
    const imgsrc = node.frontmatter.image || noImageAvailable
    return (
        <div className={styles.postCard}>
            <Link to={'/' + node.slug} key={node.id}>
                <div>
                    <div className="eyecatchImageSmallWrapper">
                        <Image filename={imgsrc}/>
                    </div>
                </div>

                <div className={styles.postCardDate}>{node.frontmatter.date}</div>
                <div className={styles.postCardTitle}>
                    <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                </div>
                <div className={styles.postCardDirectory}>
                    <Link to={'/' + node.fields.directory}>{directoryLabel(node.fields.directory)}</Link>
                </div>
                <div className={styles.postCardExcerpt}>
                    {node.frontmatter.description || node.excerpt}
                </div>
                <div style={{ clear: "both" }} />
            </Link>
        </div>
    )
}

export const PostCards = ({ nodes }) => {
    return (
        <Grid container spacing={3}>
            {
                nodes.map(node => (
                    <Grid item xs={12} sm={6} md={4} key={node.id}>
                        <PostCard node={node} />
                    </Grid>
                ))
            }
        </Grid>
    )
}
export default Post
