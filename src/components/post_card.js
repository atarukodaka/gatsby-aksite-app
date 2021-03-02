import React from 'react'
import styled from '@emotion/styled'

import Image from './image'
import LinkableWrapper from './linkable_wrapper'
import DirectoryBox from './directory_box'

const PostCardBox = styled.div`
    margin-top: 1em;
    margin-bottom: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
`

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

export const PostCard = ({ node }) => {
    const noImageAvailable = "no_image_available.png"
    const imgsrc = node.frontmatter.image || noImageAvailable

    return (
        <LinkableWrapper to={node.fields.slug}>
            <PostCardBox>
                <div className="eyecatchImageSmallWrapper">
                    <Image filename={imgsrc} />
                </div>

                <Date>{node.frontmatter.date}</Date>
                <Title>{node.frontmatter.title}</Title>
                <DirectoryBox directory={node.fields.directory} />
                <Excerpt>{node.frontmatter.description || node.excerpt}</Excerpt>
                <div style={{ clear: "both" }} />
            </PostCardBox>
        </LinkableWrapper>
    )
}

export default PostCard