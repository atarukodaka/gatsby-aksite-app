---
title: Gatsby - [5] Archives
date: 2021-02-11
---

## やること

- 月別のアーカイブを作る

## 日付情報を markdown にいれる

```md:title:content/awesome.md
---
title: markdown is awesome
date: 2020-02-02
---
...
```

date:を加えます。書式ですが、「必ず」 YYYY-MM-DD にすること。2020-2-2 とか省くと文字列扱いになっておかしなことになります。

## gatsby-node.js をいじる

query でfrontmatter { date }も取ります。フォーマットも扱いやすいように指定します。

```
...
    const { data } = await graphql(`
    {
        allMdx (sort: {fields: frontmatter___date, order: DESC}) {
            nodes {
                frontmatter {
                    title
                    date(formatString: "YYYY-MM-DD")  // 加える
                }
...                
```
この日付情報をもとにコネコネします。やり方はいろいろあるんですが、

- 年月のユニークをとる
- それぞれについて期間を指定しテンプレートにアーカイブページを作らせる

という流れで行きます。

```js
    console.log("** creating monthly archives")
    const yearMonths = new Set()
    data.allMdx.nodes.forEach(node => {
        if (node.frontmatter.date != null){
            const dt = new Date(node.frontmatter.date);
            yearMonths.add(dt.getFullYear() * 12 + dt.getMonth())
        }
    })
    
    yearMonths.forEach(yearMonth => {
        const year = parseInt(yearMonth/12)
        const month = yearMonth % 12 + 1
        const fromDate = new Date(year, month - 1, 1)
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1)

        console.log(`  ${year}/${month} archive`)

        createPage({
            path: `/archives/${year}${month.toString().padStart(2, 0)}`,
            component: path.resolve(`./src/templates/archive-template.js`),
            context: {
                archive: 'monthly',
                year: year,
                month: month,
                fromDate: fromDate.toISOString(),
                toDate: toDate.toISOString(),
            }
        })
    })    
```

テンプレートはこんな感じに：

```js:title=src/templates/archive-template.js
import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout.js"

export const query = graphql`
    query($fromDate: Date!, $toDate: Date!){        
      allMdx(sort: {fields: frontmatter___date, order: DESC},
        filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate } }} ) {
        nodes { 
          id
          excerpt(truncate: true)

          frontmatter {
            date(formatString: "YYYY-MM-DD"), title
          }        
          slug
        }
      }
    }
  `

export default function ArchiveTemplate({ data, pageContext }) {
  const { year, month } = pageContext
  console.log(`monthly archive template: ${year}/${month}`)
  
  return (
    <Layout>
        <h2>MONTHLY ARCHIVE: {year}/{month}</h2>
      {
        data.allMdx.nodes.map(node => (
            <div key={node.id}>
              <h3>{node.frontmatter.title}</h3>
              <div>{node.excerpt}</div>
              <Link to={node}>continue...</Link>
            </div>
          <PostExcerpt node={node} key={node.id} />
        ))
      }
    </Layout>
  )
}
```

from, to で指定した期間の mdx node を取ってきて、タイトルと要旨(excerpt)を表示し、単体表示ページへのリンクも貼り付ける形です。



