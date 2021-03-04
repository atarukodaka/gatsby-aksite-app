import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const Card = styled.div`
    padding: 0.5rem;
    box-shadow: 2px 2px 1px rgb(0 0 0 / 20%);
`

export const HoverBox = styled.div`
    margin: 0.5rem;
    &:hover {
        background-color: #eee;
        opacity: 0.7;
    }
    a {
        text-decoration: none;
        color: black;
    }
`

export const LinkCard = ( { children, to} ) => (
    <HoverBox>
        <Link to={to}>
            <Card>
                {children}
            </Card>
        </Link>
    </HoverBox>
)
export default LinkCard