import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
import Card from './Card'
import HoverBox from './HoverBox'
//import postTitle from './postTitle'

const Title = styled.div`
    font-size: 1.1rem;
    font-weight: bold;
    color: black;
    margin: 0em;
`

/*
const Title = styled.h4`
    margin: 0em;
`
*/

const Excerpt = styled.div`
    font-size: small;
    color: #444;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`

const Date = styled.div`
    font-size: small;
`
const ClearImage = styled.div`
    clear: both;
`

const Wrapper = ({ node, children, disableLink = false }) => {
    return (disableLink) ?
        (<div>{children}</div>) :
        (<HoverBox>
            <Link to={node.fields.slug}>
                {children}
            </Link>
        </HoverBox>)
}


export const PostCard = ({ node, disableLink = false }) => (
    <Wrapper node={node} disableLink={disableLink}>
        <Card>
            <CoverImage node={node} size="small" />
            <Date>{node.frontmatter.date}</Date>
            <Title>{node.fields.postTitle}</Title>
            <DirectoryBox directory={node.fields.directory} style={{ fontSize: "0.6rem" }} />
            <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
            <ClearImage />
        </Card>

    </Wrapper>
)

export default PostCard