import React from 'react'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

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

const ShareSNS = ({ title, url, iconSize, round }) => (
    <nav css={shareWrapper}>
        <div css={shareItem}>
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={iconSize} round={round} />
            </FacebookShareButton>
        </div>
        <div css={shareItem}>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={iconSize} round={round}/>
            </TwitterShareButton>
        </div>
    </nav>
)

ShareSNS.propTypes = {
    title: PropTypes.string,
    url: PropTypes.string,
    iconSize: PropTypes.number,
    round: PropTypes.bool
}

ShareSNS.defaultProps = {
    iconSize: 32,
    round: true,
}

export default ShareSNS