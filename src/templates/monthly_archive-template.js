import React from "react"
import { graphql, navigate } from "gatsby"
//import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
//import Pagination from '@material-ui/lab/Pagination'
//import Box from '@material-ui/core/Box'

import ArchiveTemplate from './archive_template'
//import { PostCard } from "../components/post_card.js"
//import Layout from "../components/layout.js"
import { monthlyArchivePath } from './archive_path'

export const query = graphql`
      query($fromDate: Date!, $toDate: Date!, $skip: Int!, $limit: Int!){        
      allMdx(sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate } }},
        skip: $skip, limit: $limit) {
        nodes { 
          ...postFields
        } 
      }
    }
  `
const handleChange = (year, month, p) => {
  //const pathPrefix = `/archives/${year}${month.toString().padStart(2, 0)}`
  const pathPrefix = monthlyArchivePath(year, month)
  navigate((p === 1) ? pathPrefix : `${pathPrefix}/${p}`)
}

export default function MonthlyArchiveTemplate({ data, pageContext }) {
  const { year, month } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  const title = `MONTHLY ARCHIVE: ${year}/${month}`
  //console.log(title)

  const pagination_parameters = {
    numberOfPages: pageContext.numberOfPages,
    humanPageNumber: pageContext.humanPageNumber,
    onChangeHandler: (_e, p) => { handleChange(year, month, p) }
  }
  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters}/>)
    

}

