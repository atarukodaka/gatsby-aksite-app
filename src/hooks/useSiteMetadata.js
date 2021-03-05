import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
    const query = graphql`
    {
        site { ...siteInformation } 
    }
    `
    const { site } = useStaticQuery(query)
    return site.siteMetadata
}

export default useSiteMetadata