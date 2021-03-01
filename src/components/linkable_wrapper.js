import React from 'react'
import { Link } from 'gatsby'
import { css } from "@emotion/react"

const no_decoration = css`
    text-decoration: none;
    color: black;
`

const grey_hover = css`
    &:hover {
        background-color: #eee;
        opacity: 0.7;
    }
`
export const LinkableWrapper = ({ to, children }) => (
    <div css={grey_hover}>
        <Link to={to} css={no_decoration}>
            {children}
        </Link>
    </div>
)

export default LinkableWrapper