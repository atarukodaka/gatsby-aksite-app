import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styles from './sibling.module.css'

const query = graphql`
{
    allMdx(sort: {fields: frontmatter___date, order: DESC}) {
        nodes {
            id
            frontmatter {
                title
                date
            }
            fields { 
                directory
            }
            slug
        }

    }
}
`

const Sibling = ( { node, order }) => {
    order ||= "DESC"
    const data = useStaticQuery(query)

    return (
        <div>
            <h4 className={styles.title}>SIBLINGS in '{node.fields.directory}'</h4>
            <ul>
            {
                data.allMdx.nodes.filter(v => v.fields.directory === node.fields.directory).sort((v1, v2) => v2.frontmatter.title - v1.frontmatter.title).map(v=>
                    {
                        if (node.slug === v.slug ){
                            return (<li key={v.id}>{v.frontmatter.title}</li>)
                        } else {
                        return (<li key={v.id}>
                            <Link to={'/' + v.slug}>
                            {v.frontmatter.title}
                        </Link>             

                        </li>)  
                        }
                    }
                )
            }
            </ul>
        </div>
)}

export default Sibling