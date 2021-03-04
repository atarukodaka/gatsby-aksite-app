import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import DirectoryBox from './DirectoryBox'
import CoverImage from './CoverImage'
import Card from './Card'
import HoverBox from './HoverBox'

const Title = styled.h4`
    font-weight: bold;
    color: black;
    margin: 0em;
`

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
export const PostCard = ({ node }) => (
    <HoverBox>
        <Link to={node.fields.slug}>
            <Card>
                <CoverImage node={node} size="small" />
                <Date>{node.frontmatter.date}</Date>
                <Title>{node.frontmatter.title}</Title>
                <DirectoryBox directory={node.fields.directory} style={{fontSize: "0.6rem"}}/>
                <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
                <ClearImage />
            </Card>
        </Link>
    </HoverBox>
)

export default PostCard