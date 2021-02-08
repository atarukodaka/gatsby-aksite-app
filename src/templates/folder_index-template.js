import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout.js"
import { PostExcerpt } from "../components/post.js"
import FolderName from "../components/foldername.js"

export default function FolderIndexTemplate( { data, pageContext }) {
    const folder = pageContext.folder

    return (
        <Layout>
            <h2><FolderName folder={folder}/></h2>
                {
                    data.allMdx.nodes.map(node => (
                        <PostExcerpt node={node} key={node.id} />
                    ))
                }
            
        </Layout>
    )
}


export const query = graphql`
    query($folder: String!){
        allMdx(filter: {fields: {folder: {eq: $folder}}}) {
            nodes{
                excerpt(truncate: true)
                frontmatter { date(formatString: "YYYY-MM-DD"), title }
                fields { slug, folder }
            }
        }
    }
`