---
title: Gatsby - [5] Archives
date: 2021-02-11
---
`video: https://www.youtube.com/embed/2Xc9gXyf2G4`
`youtube: https://www.youtube.com/watch?v=2Xc9gXyf2G4`
`youtube: https://www.youtube.com/watch?v=2Xc9gXyf2G4`
youtube: [Cool Youtube Video](https://www.youtube.com/watch?v=2Xc9gXyf2G4)

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

query でfrontmatter { date }も取ります。フォーマットも扱いやすいように指定したり日付でソートしたりします。

```js:gatsby-node.js
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

```js:gatsby-node.js
    const ym1s = dates.filter((date, i, self) => 
        self.findIndex(d => 
            (date.getFullYear() == d.getFullYear() && date.getMonth() == d.getMonth())
        ) === i)
```

各 mdxリソースの年月の月初日 uniq を取ります。[2020-02-02, 2020-02-04, 2020-04-12] から [2020-02-01, 2020-04-01]を取り出すわけですね。
filter() や findIndex()で uniq() のような働きをしています。

```js
    ym1s.forEach(ym1 => {
        const year = ym1.getFullYear()
        const month = ym1.getMonth()+1
        const fromDate = ym1
        const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1)

        console.log(`${year}/${month}`)
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

そしてその YYYYMM01 ごとにテンプレートを経由して月別アーカイブを作成します。

- date の getMonth() は０スタートの数字を返す:2020-02-01 なら 1
- padStart()はゼロパディングをしてくれる:　3 -> "03"
- toISOString() は YYYY-MM-DD 形式に変換

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
export const PostExcerpt = ({ node }) => {
    return (
        <div>
            <h3 className={styles.title}>
              <Link to={'/' + node.slug}>{node.frontmatter.title || node.slug}</Link>
            </h3>

            <div>
                {node.excerpt}
                <Link to={'/' + node.slug}>...continue reading</Link>
            </div>
        </div>
    )
}
```

from, to で指定した期間の mdx node を取ってきて、タイトルと要旨(excerpt)を表示し、単体表示ページへのリンクも貼り付ける形です。


