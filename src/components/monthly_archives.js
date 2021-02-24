import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
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

const monthlyArchivePath = ( year, month ) => {
    return `/archives/${year}${month.toString().padStart(2,0)}`
}

const createMonthlyArchiveList = (  nodes  ) => {
    const list = []
    nodes.forEach(node=>{
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const yyyymm = year.toString() + (month).toString().padStart(2,0)
    
        const item = list.find(v=>v.id === yyyymm)
        if (item === undefined){
            list.push({id: yyyymm, year: year, month: month, date: date, 
                path: monthlyArchivePath(year, month),
                countTotal: 1})
        } else {
            item.countTotal ++
        }
    })
    return list
}

const MonthlyArchives = ( { expandAll } ) => {
    const data = useStaticQuery(query)
    const list = createMonthlyArchiveList(data.mdxPages.nodes)
    const years = [...new Set(list.map(v=>v.year))].sort((a, b) => b-a)
    
    const defaultExpanded = ( expandAll) ? years : []
    
    const handleClick = (node) => {
        //navigate(monthlyArchivePath(node.year, node.month))
        navigate(node.path)
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
                    return (<TreeItem key={year} nodeId={year.toString()} label={ `${year} (${countTotal})`}>
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
