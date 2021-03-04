import React from 'react'
import { Link } from 'gatsby'

import Card from './Card'
import HoverBox from './HoverBox'


const LinkCard = ( { children, to} ) => (
    <HoverBox>
        <Link to={to}>
            <Card>
                {children}
            </Card>
        </Link>
    </HoverBox>
)
export default LinkCard