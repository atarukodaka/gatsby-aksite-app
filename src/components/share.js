import React from 'react'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import { css } from '@emotion/react'

const shareWrapper = css`
    display: inline-block;
    padding-bottom: 0.2em;
    padding-top: 0.5em;
    margin-bottom: 2em;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
`

const shareItem = css`
    margin-right: 0.5em;
    margin-left: 0.5em;
    display: inline-block;
`

const Share = ({ title, url }) => (
    <nav css={shareWrapper}>
        <div css={shareItem}>
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
        </div>
        <div css={shareItem}>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round/>
            </TwitterShareButton>
        </div>
    </nav>
)

export default Share