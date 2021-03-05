import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import PostCard from './PostCard'

const Series = ( {title, display="card"} ) => {

    const query = graphql`
        {
            allMdx {
                nodes {
                    ...postFields
                }
            }
        }
    `
    const data = useStaticQuery(query)
    const nodes = data.allMdx.nodes.filter(v=>(v.frontmatter.series?.title === title)).sort((a, b)=> a.frontmatter.series.number - b.frontmatter.series.number)
    //console.log("series title:", title)
    //console.log("nodes length", nodes.length)

    switch (display){
    case "text":
        return (<ul>
            { nodes.map(node=>(<li key={node.id}>
                    <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
                </li>))}
            </ul>)
    default:
        return (<nav>
            {nodes.map(node=>
                (<PostCard node={node} key={node.id}/>))
            }   
            </nav>)
    }
}

export default Series
