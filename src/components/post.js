import React from "react"
import { Link } from "gatsby"
import Layout from "./layout.js"
import { makeStyles} from "@material-ui/core"

const useStyles = makeStyles({
    post_title: {
        fontSize: "xx-large",
        fontWeight: "bold",
        borderBottom: "1px solid",
        paddingBottom: "1px",
        marginBottom: "1px"
        
    },
    post_info: {
        fontSize: "small",
        textAlign: "right",
    }
})


const Post = ( { node }) => {
    const classes = useStyles()
    return (
        <div>
        <h2 className={classes.post_title}>{node.frontmatter.title}</h2>
        <div className={classes.post_info}>| 
            <Link to={node.fields.folder}>{node.fields.folder}</Link> | 
            { node.frontmatter.date} |
        </div>
        <div dangerouslySetInnerHTML={{ __html: node.html }} />
      </div>
    )
}

export default Post
