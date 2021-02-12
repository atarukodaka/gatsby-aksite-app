import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from 'react-helmet';

const query = graphql`
{
    site {
        siteMetadata {
            title
            author
            description
            siteUrl
        }
    }
}
`
const SEO = ( { title } ) => {
    const data = useStaticQuery(query)
    return (
        <Helmet>
            <title>
                {title + ' | ' + data.site.siteMetadata.title}
            </title>

        </Helmet>
    )
}

export default SEO