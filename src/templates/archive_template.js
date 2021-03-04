import React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Box from '@material-ui/core/Box'
import { Pagination } from '@material-ui/lab'

import { PostCard } from "../components/post_card.js"
import Layout from "../components/layout.js"


const ArchiveTemplate = ( {title, nodes, crumbs, pagination_parameters, showTitle = true} ) => (
    <Layout title={title}>
      <Breadcrumb crumbs={crumbs} />
      { showTitle && (<h1 className="pageTitle">{title}</h1>)}
      {
        nodes.map(node => (
          <PostCard node={node} key={node.id} />
        ))
      }
  
      <Box display="flex" justifyContent="center" m={3}>
        <Pagination count={pagination_parameters.numberOfPages} page={pagination_parameters.humanPageNumber} 
          onChange={pagination_parameters.onChangeHandler} />
      </Box>
    </Layout>
  )

export default ArchiveTemplate  
