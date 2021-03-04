import React from "react"
import { graphql, navigate } from "gatsby"
import { directoryArchivePath } from '../utils/archive_path'
import ArchiveTemplate from './archive_template'

export const query = graphql`
    query($regex: String!, $skip: Int!, $limit: Int!){        
      allMdx(sort:  {fields: frontmatter___date, order: DESC},
        filter: {fields: {directory: {regex: $regex}}},
        skip: $skip, limit: $limit
         ) {
        nodes { 
          ...postFields
        }
      }
    }
  `
const handleChange = (directory, p) => {
  const path = directoryArchivePath(directory)
  navigate((p === 1) ? path : `${path}/${p}`)
}

export default function DirectoryArchiveTemplate({ data, pageContext }) {
  const { directory } = pageContext
  const { breadcrumb: { crumbs } } = pageContext
  //const current_directory = directory.split('/').slice(-1)
  const label = crumbs.slice(1).map(v => v.crumbLabel).join('/')
  const title = `DIRECTORY: ${label}`

  //const picked = (({ foo, bar }) => ({ foo, bar }))(context);
  
  const pagination_parameters = {
    numberOfPages: pageContext.numberOfPages,
    humanPageNumber: pageContext.humanPageNumber,
    onChangeHandler: (_e, p) => { handleChange(directory, p) }
  }
  return (<ArchiveTemplate title={title} nodes={data.allMdx.nodes} crumbs={crumbs}
    pagination_parameters={pagination_parameters}/>)
    

}
