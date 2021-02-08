import React from "react"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import styled from "@emotion/styled"

const PostTitle = styled.h2`
    font-size: xx-large;
    font-weight: bold;
    border-bottom: 1px solid;
    padding-bottom: 1px;
    margin-bottom: 1px;
`

const PostInfo = styled.div`
    font-size: small;
    text-align: right;
`

const PostContinueReading = styled.div`
    font-size: small;
    text-align: right;
    font-style: italic;
`

const Post = ({ node }) => {
    return (
        <div>
            <PostTitle>{node.frontmatter.title}</PostTitle>
            <PostInfo>
                <Link to={'/' + node.fields.directory}>{node.fields.directory}</Link> |
                {node.frontmatter.date} |
            </PostInfo>

            <MDXRenderer>
                {node.body}
            </MDXRenderer>
        </div>
    )
}

export const PostExcerpt = ({ node }) => {
    return (
        <div>
            <PostTitle>{node.frontmatter.title}</PostTitle>
            <PostInfo>
                <Link to={'/' + node.fields.directory}>{node.fields.directory}</Link> |
                {node.frontmatter.date} |
            </PostInfo>

            <div>{node.excerpt}</div>
            <PostContinueReading>
                <Link to={node.fields.slug}>continue reading...</Link>
            </PostContinueReading>
        </div>
    )
}

export default Post
