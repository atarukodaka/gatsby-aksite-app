import React from "react"
import { Link } from "gatsby"
import { css } from '@emotion/react'

import directoryLabel from '../utils/directory_label'

const cssDirectoryBox = css`
    font-size: 0.8rem;
    display: inline-block;
    background-color: #cdd;
    a {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        text-decoration: none;
    }
    &:hover {
        background-color: #eff;
    }
`

const DirectoryBox = ({ node }) => (
    <div css={cssDirectoryBox}>
        <Link to={'/' + node.fields.directory}>
            {directoryLabel(node.fields.directory)}
        </Link>
    </div>

)

export default DirectoryBox