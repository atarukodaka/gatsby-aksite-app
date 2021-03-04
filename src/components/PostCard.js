import React from 'react'
import styled from '@emotion/styled'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
import LinkCard from './LinkCard'

const Title = styled.div`
    font-weight: bold;
    color: black;
`

const Excerpt = styled.div`
    font-size: small;
    color: #444;
    padding-left: 1em;
    padding-right: 1em;
`

const Date = styled.div`
font-size: small;
`
const ClearImage = styled.div`
    clear: both;
`
export const PostCard = ({ node }) => (
    <LinkCard to={node.fields.slug}>
        <CoverImage node={node} className="eyecatchImageSmallWrapper" />
        <Date>{node.frontmatter.date}</Date>
        <Title>{node.frontmatter.title}</Title>
        <DirectoryBox directory={node.fields.directory} />
        <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
        <ClearImage/>
    </LinkCard>
)

export default PostCard