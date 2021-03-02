import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'
import LaunchIcon from '@material-ui/icons/Launch';


const cssExternalLink = css`
    margin-top: 1em;
    margin-bottom: 1em;
    padding-left: 1em;
    padding-top: 1em;
    padding-bottom: 1em;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);

    a {
        text-decoration: none;
        color: black;
        padding-left: 1rem;
    }
    &:hover {
        background-color: #eee;
        opacity: 0.7;
    }
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        float: left;
        margin-bottom: 0px;
        background-color: #ccc;
    }
`

const ExternalLink = ( {children, imgsrc, to}) => (
    <div css={cssExternalLink}>
        <a href={to} target="_blank">
            <img src={imgsrc}/>
            {children}
        <LaunchIcon/>
        </a>
        <br clear="both"/>
    </div>

    
)

export default ExternalLink
