import React from 'react'
import { Link } from 'gatsby'
import { css } from "@emotion/react"

export const grey_hover = css`
    &:hover {
        background-color: #eee;
        opacity: 0.7;
    }
    a {
        text-decoration: none;
        color: black;
    }
`
export const LinkHover = ({ to, children }) => (
    <div css={grey_hover}>
        <Link to={to}>
            {children}
        </Link>
    </div>
)

export default LinkHover