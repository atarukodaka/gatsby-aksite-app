import React from "react"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PropTypes from 'prop-types'

import { monthlyArchivePath } from '../utils/archive_path'
//import DirectoryLabel from '../utils/directory_label'

const query = graphql`
{
    mdxPages: allMdx {
        nodes {
            id
            fields { slug, directory }
            frontmatter { title, date(formatString: "YYYY-MM-DD") }
        }
    }

}                
`

const createMonthlyArchiveList = (  nodes  ) => {
    const list = []
    nodes.forEach(node=>{
        const date = new Date(node.frontmatter.date)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const yyyymm = year.toString() + (month).toString().padStart(2,0)
    
        let item = list.find(v=>v.id === yyyymm)
        if (item === undefined){
            item = {id: yyyymm, year: year, month: month, date: date, 
                path: monthlyArchivePath(year, month),
                nodes: []} // , countTotal: 1}
            list.push(item)
        //} else {
           // item.countTotal ++
        }
        item.nodes.push(node)
    })
    return list
}

const MonthlyArchives = (  ) => {
    const data = useStaticQuery(query)
    const list = createMonthlyArchiveList(data.mdxPages.nodes)
    const years = [...new Set(list.map(v=>v.year))].sort((a, b) => b-a)
    
    //const defaultExpanded = ( expandAll) ? years : []
    const defaultExpanded = [] // TODO

    //  
    return (
        <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultExpanded={defaultExpanded}
    >
            {
                years.map(year=>{
                    const items = list.filter(v=> v.year === year)
                    //const countTotal = items.reduce((prev, curr) => prev + curr.countTotal, 0)
                    const countTotal = items.reduce((prev, curr) => prev + curr.nodes.length, 0)
                    
                    return (<TreeItem key={year} nodeId={year.toString()} label={ `${year} (${countTotal})`}>
                        {
                            items.map(item=>(
                                <TreeItem key={item.id} nodeId={item.id} 
                                 label={`${item.year}/${item.month} (${item.nodes.length})`}
                                 onLabelClick={() => { navigate(item.path) }}>
                                    {/* item.nodes.map(node=>(
                                        <TreeItem key={node.id} label={`${node.frontmatter.title}[${DirectoryLabel(node.fields.directory)}]`}
                                         onLabelClick={() => { navigate(node.fields.slug) }}></TreeItem>
                                    ))*/
                                    }
                                </TreeItem> 
                            ))
                        }
                    </TreeItem>

                )})
            }
        </TreeView>
    )
}

MonthlyArchives.propTypes = {
    expandAll: PropTypes.bool,
}
MonthlyArchives.defaultProps = {
    expandAll: false,
}
export default MonthlyArchives
