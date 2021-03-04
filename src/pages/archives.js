import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import MonthlyArchives from '../components/MonthlyArchives'
import Layout from '../components/Layout'

export default ({ pageContext}) => {
    const { breadcrumb: { crumbs } } = pageContext

    return (
        <Layout>
            <Breadcrumb crumbs={crumbs} crumbLabel='Monthly Archives'/>
            <h3 className="pageTitle">Monthly Archives</h3>
            <MonthlyArchives expandAll={true}/>
        </Layout>
    )
}

