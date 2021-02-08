import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import { Button } from "@material-ui/core"
import styled from "@emotion/styled"

const TopTitle = styled.div`
    font-size: x-large;
    color: #aaa;
    background-color: black;
    padding: 20px;
`
const Navbar = styled.nav`
    color: #ddd;
    background-color: #eee;

`
const Header = ( ) => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    )
    return (
        <div>
            <TopTitle>
                {data.site.siteMetadata.title}
            </TopTitle>
            <Navbar>
                <Button component={Link} to="/">Top</Button>
                <Button component={Link} to="/about">About</Button>
            </Navbar>
        </div>
    )
}

export default Header