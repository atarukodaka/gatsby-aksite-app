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
                {node.fields.directory_name}
            </Link>
        </div>
        
        { node.frontmatter.image && (
        <div className="eyecatchImageWrapper" style={{backgroundImage: `url(${node.frontmatter.image})`}}></div>
        )}
        
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
            { /* node.frontmatter.image && (<img src={node.frontmatter.image} className="eyecatchImageSmall"></img>) */ }
            <div className={styles.excerpt}>{node.excerpt}</div>
            <div className={styles.continueReading}>
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
        </main>
    </div>
)


export const PostCard = ({ node, disableLink, showExcerpt }) => {
    if (showExcerpt === undefined){ showExcerpt = true}
    
    const noImageAvailable = "/images/no_image_available.png"
    const imgsrc = node.frontmatter.image || noImageAvailable
    return (
        <div key={node.id} className={styles.postCard}>
            <div>
                <img src={imgsrc} className="eyecatchImageSmall"/> 
            { /* { node.frontmatter.image && (<img src={imgsrc} className="eyecatchImageSmall" alt="eye catch image"/>) } */ }

            </div>
            
            <div className={styles.postCardDate}>{node.frontmatter.date}</div>
            <h4 className={styles.postCardTitle}>
                { (disableLink) ? node.frontmatter.title : 
                    <Link to={'/' + node.slug}>{node.frontmatter.title}</Link>
                }
            </h4>
            <div className={styles.postCardDirectory}>
                <Link to={'/'+node.fields.directory}>{node.fields.directory_name}</Link>
            </div>
            { showExcerpt && (
            <div className={styles.postCardExcerpt}>
                {node.excerpt}
            </div>
            
            )}
            <div style={{clear: "both"}}/>
        </div>
    )
}

export const PostCards = ( {nodes, showExcerpt }) => {
    return (
        <Grid container spacing={3}>
            {
            nodes.map(node=>(
                <Grid item xs={6} sm={4}>
                    <PostCard node={node} key={node.id} showExcerpt={showExcerpt}/>
                </Grid>
            ))
            }
        </Grid>
    )
}
export default Post
