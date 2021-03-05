

const postTitle = ( node ) => {
    const series = node.frontmatter.series
    let title = null
    if (series){
        title = `${series.title}[${series.number}] ${node.frontmatter.title}`
    } else {
        title = node.frontmatter.title
    }
    return title
}

export default postTitle
