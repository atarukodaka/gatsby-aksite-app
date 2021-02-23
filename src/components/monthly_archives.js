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
            frontmatter { date(formatString: "YYYY-MM") }
        }
    }
    monthlyArchives: allSitePage(sort: {fields: context___fromDate, order: DESC}, 
        filter: {context: {archive: {eq: "monthly"} }}){    
        nodes {
            id
            path
            context {
                year, month
                fromDate, toDate
                count
            }
        }
    }
    
    monthlyArchivesByYear: allSitePage(sort: {fields: context___fromDate, order: DESC}) {
        group(field: context___year) {
            year: fieldValue
            totalCount
            nodes {
                id
                path
                context {
                    year
                    month
                    fromDate
                    toDate
                    count
                }
            }
        
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
    const year_nodes = []
    data.mdxPages.nodes.forEach(node=>{
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const yyyymm = year.toString() + (month).toString().padStart(2,0)
    
        const item = list.find(v=>v.id === yyyymm)
        if (item === undefined){
            list.push({id: yyyymm, year: year, month: month, count: 1})
        } else {
            item.count ++
        }
    })
    list.forEach(item => {
        let y_item = year_nodes[item.year]
        if (y_item === undefined){
            y_item = year_nodes[item.year] = {year: item.year, child: [], count: 0}
        }
        y_item.child[item.month] = item
        y_item.count += item.count

    })
    const defaultExpanded = ( expandAll) ? year_nodes.map(v=>v.year) : []

    
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
                year_nodes.sort((a, b) => b.year - a.year).map(y_node=>(
                    <TreeItem key={y_node.year} nodeId={y_node.year} label={ `${y_node.year} (${y_node.count})`}>
                        {
                            y_node.child.map(m_node=>(
                                <TreeItem key={m_node.id} nodeId={m_node.id} label={`${m_node.year}/${m_node.month} (${m_node.count})`} onLabelClick={() => { handleClick(m_node) }}/>
                            ))
                        }
                    </TreeItem>

                ))
            }
        </TreeView>
    )
}

/*
const MonthlyArchives = ( { expandAll }) => {
    const data = useStaticQuery(query)

    const handleClick = (node) => {
        navigate(node.path)
    }
    const formatLabel = (node) => {
        return node.context.year + '/' + node.context.month.toString().padStart(2, ' ') + ' (' + node.context.count + ')'
    }
    const countByYear = []
    const years = new Set()
    data.monthlyArchivesByYear.group.forEach(year_node => {
        year_node.nodes.forEach(node => {
            countByYear[node.context.year] === undefined && (countByYear[node.context.year] = 0)
            countByYear[node.context.year] = parseInt(countByYear[node.context.year]) + node.context.count
            years.add(node.context.year.toString())
        })
    })

    const defaultExpanded = (expandAll) ? [...years] : []

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={defaultExpanded}
        >
            {data.monthlyArchivesByYear.group.sort((a, b) => b.year - a.year).map(year_node => (
                <TreeItem key={year_node.year} nodeId={year_node.year} label={year_node.year + ' ('+countByYear[year_node.year]+')'}>
                    {
                        year_node.nodes.sort((a, b) => a.context.month - b.context.month).map(node => (
                            <TreeItem key={node.id} nodeId={node.id} label={formatLabel(node)} onLabelClick={() => { handleClick(node) }}>
                            </TreeItem>
                        ))
                    }
                </TreeItem>
            ))}
        </TreeView>
    )

}
*/
export default MonthlyArchives
