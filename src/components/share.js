import React from 'react'
import { TwitterShareButton, TwitterIcon } from 'react-share'


const Share = ( {title, url} ) => (
    <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32}/>
    </TwitterShareButton>
)

export default Share