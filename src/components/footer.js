import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = ( ) => {
    const data = useStaticQuery(graphql`
    {
        site {
            siteMetadata {
              title
              author
            }
          }        
    }
`)
    
    return (
        <footer>
            <hr/>
            <div>(C) written by { data.site.siteMetadata.author } { (new Date()).getFullYear() } </div>
        </footer>
    )
}

export default Footer


