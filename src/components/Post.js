import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { useLocation } from "@reach/router"
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import DirectoryBox from './DirectoryBox'
import MdxComponents from './MdxComponents'
import ShareSNS from './ShareSNS'
import styles from "./post.module.css"
import CoverImage from './CoverImage'

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
`
const query = graphql`
    { site { siteMetadata { siteUrl }} }
`

const RenderMDX = ({ body }) => {
    //const shortcodes = {Image, PostLink}
    return (
        <MDXProvider components={MdxComponents}>
            <div className={styles.numbering_headings}>
                <MDXRenderer>
                    {body}
                </MDXRenderer>
            </div>
        </MDXProvider>
    )
}

const Post = ({ node }) => {
    const data = useStaticQuery(query)
    const { pathname } = useLocation()

    return (
        <div css={cssPost}>
            <Header>
                <div>{node.frontmatter.date}</div>
                <Title>{node.frontmatter.title}</Title>
                <DirectoryBox directory={node.fields.directory} />
                <CoverImage node={node} className="eyecatchImageWrapper" />
                <Description>{node.frontmatter.description}</Description>
            </Header>
            <Main>
                <RenderMDX body={node.body} />
            </Main>
            <Footer>
                <ShareSNS url={`${data.site.siteMetadata.siteUrl}${pathname}`}
                    title={node.frontmatter.title} />
            </Footer>
        </div>
    )
}

export default Post
