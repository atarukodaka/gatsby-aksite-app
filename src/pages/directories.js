import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import DirectoryArchives from '../components/directory_archives'
import Layout from '../components/layout'

export default ({ pageContext}) => {
    const { breadcrumb: { crumbs } } = pageContext

    return (
        <Layout>
            <Breadcrumb crumbs={crumbs} crumbLabel='Directory Archives'/>
            <h3>Directory Archives</h3>
            <DirectoryArchives/>
        </Layout>
    )
}

