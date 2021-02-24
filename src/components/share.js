import React from 'react'
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import styles from './share.module.css'

const Share = ({ title, url }) => (
    <nav className={styles.shareWrapper}>

        <div className={styles.shareItem}>
            <FacebookShareButton url={url} title={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
        </div>
        <div className={styles.shareItem}>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round/>
            </TwitterShareButton>
        </div>

    </nav>
)

export default Share