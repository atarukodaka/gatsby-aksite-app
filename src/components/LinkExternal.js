import React from 'react'
//import { Link } from 'gatsby'
//import { css } from '@emotion/react'
import styled from '@emotion/styled'
import LaunchIcon from '@material-ui/icons/Launch';

import { grey_hover } from './link_hover'


const StyledLink = styled.div`
    padding: 1rem;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
    
    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        float: left;
        margin-bottom: 0px;
        background-color: #ccc;
    }
`

const LinkExternal = ({ children, to }) => (
    <div css={grey_hover}>
        <a href={to} target="_blank" rel="noreferrer">
            <StyledLink>
                {children}
                <LaunchIcon size="small"/>
            </StyledLink>
        </a>
    </div>
    
)

export default LinkExternal
