import React from 'react'
import MonthlyArchives from '../components/monthly_archives'
import Layout from '../components/layout'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'

export default ({ pageContext}) => {
    const { breadcrumb: { crumbs } } = pageContext

    return (
        <Layout>
            <Breadcrumb crumbs={crumbs} crumbLabel='Monthly Archives'/>
            <h3>Monthly Archives</h3>
            <MonthlyArchives/>
        </Layout>
    )
}

