import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const query = graphql`
{
    monthlyArchives: allSitePage(sort: {fields: context___fromDate, order: DESC}, 
        filter: {context: {archive: {eq: "monthly"} }}){    
        nodes {
            id
            path
            context {
                year, month
                fromDate, toDate
            }
        }
    }
}                
`

const MonthlyArchives = ( ) => {
    const data = useStaticQuery(query)    
    return (
        <ul>
            {
                data.monthlyArchives.nodes.map(node => (
                    <li key={node.id}>
                        <Link to={node.path}>{node.context.year}/{node.context.month}</Link>
                    </li>
                ))
            }
        </ul>
    )
}

export default MonthlyArchives