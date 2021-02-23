import React from "react"
import { useStaticQuery, graphql, navigate, Link } from "gatsby"
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const query = graphql`
{
    mdxPages: allMdx {
        nodes {
            id, slug
            frontmatter { date(formatString: "YYYY-MM-DD") }
        }
    }

}                
`

const MonthlyArchivePath = ( year, month ) => {
    return `/archives/${year}${month.toString().padStart(2,0)}`
}

const CreateMonthlyArchivesList = ( { nodes } ) => {
    
}
const MonthlyArchives = ( { expandAll } ) => {
    const data = useStaticQuery(query)
    const list = []
    //const year_nodes = []
    //const years = []
    data.mdxPages.nodes.forEach(node=>{
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const yyyymm = year.toString() + (month).toString().padStart(2,0)
    
        const item = list.find(v=>v.id === yyyymm)
        if (item === undefined){
            list.push({id: yyyymm, year: year, month: month, countTotal: 1})
        } else {
            item.countTotal ++
        }
    })
    const years = [...new Set(list.map(v=>v.year))].sort((a, b) => b-a)
    
    const defaultExpanded = ( expandAll) ? years : []
    
    const handleClick = (node) => {
        navigate(MonthlyArchivePath(node.year, node.month))
    }
    return (
        <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultExpanded={defaultExpanded}
    >
            {
                years.map(year=>{
                    const nodes = list.filter(v=> v.year === year)
                    const countTotal = nodes.reduce((prev, curr) => prev + curr.countTotal, 0)
                    return (<TreeItem key={year} nodeId={year} label={ `${year} (${countTotal})`}>
                        {
                            nodes.map(node=>(
                                <TreeItem key={node.id} nodeId={node.id} label={`${node.year}/${node.month} (${node.countTotal})`} onLabelClick={() => { handleClick(node) }}/>
                            ))
                        }
                    </TreeItem>

                )})
            }
        </TreeView>
    )
}
export default MonthlyArchives
