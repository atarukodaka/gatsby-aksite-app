import React from "react"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

const non_decoration = css`
    text-decoration: none;
`

const Tree = ({ items }) => (
    <ol>
        {
            items.map(v => (
                <li key={v.url}>
                    <Link to={v.url} css={non_decoration}>{v.title}</Link>
                    {v.items && (<Tree items={v.items} />)}
                </li>
            ))
        }
    </ol>
)

export default Tree
