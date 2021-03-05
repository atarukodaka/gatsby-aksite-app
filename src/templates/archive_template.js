import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Box from '@material-ui/core/Box'
import { Pagination } from '@material-ui/lab'

import { PostCard } from "../components/PostCard"
import Layout from "../components/Layout"


const ArchiveTemplate = ( {title, nodes, crumbs, pagination_parameters, showTitle = true} ) => (
    <Layout title={title}>
      {crumbs && (<Breadcrumb crumbs={crumbs} />)}
      { showTitle && (<h1 className="pageTitle">{title}</h1>)}
      {
        nodes.map(node => (
          <PostCard node={node} key={node.id} />
        ))
      }

      {pagination_parameters &&
      (<Box display="flex" justifyContent="center" m={3}>
        <Pagination count={pagination_parameters.numberOfPages} page={pagination_parameters.humanPageNumber} 
          onChange={pagination_parameters.onChangeHandler} />
      </Box>)}
    </Layout>
  )

export default ArchiveTemplate  
