import React from 'react'
//import { Link } from 'gatsby'
//import { css } from '@emotion/react'
//import styled from '@emotion/styled'
import LaunchIcon from '@material-ui/icons/Launch';

//import { grey_hover } from './link_hover'
import Card from './Card'
import HoverBox from './HoverBox'

const LinkExternal = ({ children, to }) => (
    <HoverBox>
        <a href={to} target="_blank" rel="noreferrer">
            <Card>
                {children}
                <LaunchIcon size="small"/>
            </Card>
        </a>
    </HoverBox>
    
)

export default LinkExternal
