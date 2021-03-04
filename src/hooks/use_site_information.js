import { useStaticQuery, graphql } from 'gatsby'

const useSiteInformation = () => {
    const query = graphql`
    {
        site { ...siteInformation } 
    }
    `
    const data = useStaticQuery(query)
    return data.site.siteMetadata
}

export default useSiteInformation