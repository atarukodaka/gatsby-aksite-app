import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
//import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
//import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import DirectoryBox from './DirectoryBox'
import MdxComponents from './MdxComponents'
import ShareSNS from './ShareSNS'
import styles from "./post.module.css"
import CoverImage from './CoverImage'
import directoryLabel from '../utils/directory_label'
import PostCard from './PostCard'
//import postTitle from './postTitle'

const Title = styled.h1`
    margin-bottom: 0.5rem;
    padding: 0.5em;
    font-weight: bold;

    background: linear-gradient(to bottom,  #4848aa 0%, #222277 100%);  
    color: white;
`
const Description = styled.div`
    padding: 1rem;  
`
const Header = styled.header`
    box-shadow: 0px 1px rgb(0 0 0 / 10%)
`
const Main = styled.main`
    margin-top: 1rem;
    padding-bottom: 1rem;
    padding-right: 1rem; 
`
const Footer = styled.footer`
    border-top: solid 1px;
    padding-top: 1rem;
`
const cssPost = css`
    margin-top: 2em;
    margin-bottom: 2em;
    /* padding-bottom: 1em; */
    /* padding-right: 1em; */
    /* background-color:white; */
    /* box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);  */
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%)
//`
const query = graphql`
    { site { siteMetadata { siteUrl }} }
`

const RenderMDX = ({ children }) => {
    //const shortcodes = {Image, PostLink}
    return (
        <MDXProvider components={MdxComponents}>
            <div className={styles.body}>
                <MDXRenderer>
                    {children}
                </MDXRenderer>
            </div>
        </MDXProvider>
    )
}
const Siblings = ({ nodes }) => (
    <nav>
        <Grid container spacing={3}>
            {nodes.slice(0, 9).map(v =>
                (<Grid item xs={12} sm={6} key={v.id}><PostCard node={v} /></Grid>))
            }
        </Grid>
    </nav>
)

const PrevNextPost = ({ prevPost, nextPost }) => (
    <nav style={{ marginBottom: "2rem" }}>
        <Grid container>
            <Grid item sm={4}>
                <h4 style={{ textAlign: "left" }}>
                    《 PREV POST
            </h4>
                {prevPost && (<PostCard node={prevPost} />)}
            </Grid>
            <Grid item sm={4} />
            <Grid item sm={4}>
                <h4 style={{ textAlign: "right" }}>NEXT POST》</h4>
                {nextPost && (<PostCard node={nextPost} />)}
            </Grid>
        </Grid>
    </nav>


)
const Post = ({ node, siblings, prevPost, nextPost }) => {
    const data = useStaticQuery(query)
    const { pathname } = useLocation()

    return (
        <div css={cssPost} className={styles.post}>
            <Header>
                <div>{node.frontmatter.date}</div>
                <Title>{node.fields.postTitle}</Title>
                <DirectoryBox directory={node.fields.directory} />
                <CoverImage node={node} />
                <Description>{node.frontmatter.description}</Description>
            </Header>
            <Main>
                <RenderMDX>
                    {node.body}
                </RenderMDX>
            </Main>
            <Footer>
                <ShareSNS url={`${data.site.siteMetadata.siteUrl}${pathname}`}
                    title={node.fields.postTitle}/>
                <PrevNextPost prevPost={prevPost} nextPost={nextPost} />
                <Divider />
                <h3>Siblings on '{directoryLabel(node.fields.directory)}'</h3>
                <Siblings nodes={siblings} />
            </Footer>
        </div>
    )
}

export default Post
