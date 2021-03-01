import React from 'react'
import { css } from '@emotion/react'

import Image from './image'
import LinkableWrapper from './linkable_wrapper'
import DirectoryBox from './directory_box'

const postcard = css`
    margin-top: 1em;
    margin-bottom: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
`

const title = css`
    font-weight: bold;
    color: black;
`

const date = css`
    font-size: small;
`
const excerpt = css`
    font-size: small;
    color: #444;
    padding-left: 1em;
    padding-right: 1em;
`

export const PostCard = ({ node }) => {
    const noImageAvailable = "no_image_available.png"
    const imgsrc = node.frontmatter.image || noImageAvailable

    return (
        <LinkableWrapper to={node.fields.slug}>
            <div css={postcard}>
                <div className="eyecatchImageSmallWrapper">
                    <Image filename={imgsrc} />
                </div>

                <div css={date}>
                    {node.frontmatter.date}
                </div>
                <div css={title}>
                    {node.frontmatter.title}
                </div>
                <DirectoryBox node={node} />
                <div css={excerpt}>
                    {node.frontmatter.description || node.excerpt}
                </div>
                <div style={{ clear: "both" }} />
            
            </div>
        </LinkableWrapper>
    )
}

export default PostCard