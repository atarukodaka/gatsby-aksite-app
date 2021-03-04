import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Helmet } from 'react-helmet'
import { useLocation } from "@reach/router"

const query = graphql`
{
    site {
        ...siteInformation
    }
}
`
const SEO = ( { title, description, image, lang } ) => {
    const { site }  = useStaticQuery(query)
    const { pathname } = useLocation()
    const siteUrl = site.siteMetadata.siteUrl
    const twitterUsername = site.siteMetadata.social.twitter
    const coverImage = site.siteMetadata.coverImage
    const url = [siteUrl, pathname].join('/')
    
    //const imageUrl = (image) ? [siteUrl, "images", image].join('/') : [siteUrl, "images/top.png"].join('/')
    const imageUrl = siteUrl + coverImage
  
    return (
        <Helmet
            htmlAttributes={ (lang) ? { lang: lang } : {} }
            title={title}
            meta={[
                { name: 'description', content: description },
                { name: 'image', content: imageUrl },
                { property: 'og:url', content: url },
                { property: 'og:description', content: description },
                { property: 'og:image', content: imageUrl },
                { name: 'twitter:card', content: 'summary'},
                { name: 'twitter:creator', content: twitterUsername },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: imageUrl }
            ]}
        />
    )
}

SEO.propTypes = {
    title: PropTypes.string.isRequired,  
    description: PropTypes.string,
    image: PropTypes.string,
    lang: PropTypes.string,
  }
  
  SEO.defaultProps = {
    title: null,
    description: null,
    image: null,
    lang: null,
  }
export default SEO