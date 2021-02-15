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

    monthlyArchivesByYear: allSitePage(sort: {fields: context___fromDate, order: ASC}) {
        group(field: context___year) {
            fieldValue
            nodes {
                path
                context {
                    year
                    month
                }
            }
        }
      }
}                

`

const MonthlyArchivesAll = ( data) => {
    //const { monthlyArchives } = useStaticQuery(query)

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

/*
const MonthlyArchivesByYear = ( data ) => {
    //const { data: { monthlyArchivesByYear} } = useStaticQuery(query)
    //const data  = useStaticQuery(query)

    return (
        <ul>
            {
                data.monthlyArchivesByYear.group.map(v => (
                    <li key={v.id}>
                        {v.fieldValue}
                            <ul>
                                <li>
                                {
                                    v.nodes.map(vv=> (
                                        <Link to={vv.path}>{ vv.context.month } </Link>
                                    ))
                                
                                }
                                </li>
                            </ul>
                    </li>
                ))
            }
        </ul>
    )
}
*/

const MonthlyArchives = () => {
    // return MonthlyArchivesAll()
    const data = useStaticQuery(query)
    return MonthlyArchivesAll(data)
}

export default MonthlyArchives