import React from "react"
import { useStaticQuery, Link } from "gatsby"


const Header = () => {
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
        <header>
            <h2> title:  { data.site.siteMetadata.title } </h2>
            <nav>
                <ol>
                    <li><Link to="/">Top</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ol>

            </nav>
          

        </header>
    )
}

export default Header