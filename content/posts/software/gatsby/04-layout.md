---
title: Gatsby - [4] Layout
date: 2021-02-09 04:00:00
image: gatsby.png
---

## やること

- レイアウトや身だしなみを整えます
- レスポンシブルデザインは material-ui で
- css 

よくある、上部にタイトルなどのヘッダ、真ん中の左に本文、右にサイドバー、そして下部にフッターという構成できいます。

## material-ui のインストール
コンポーネント集の material-ui を入れておきます。各種部品やグリッドシステムが入ってるので使います。

```sh
npm i --save gatsby-plugin-material-ui @material-ui/core 
```

いつもどおり `gatsby-plugin-material-ui` を plugin に入れときます。

## 大まかなレイアウト
ざっくりと組みます。

```js:title=src/components/layout.js
import React from "react"
import Paper from '@material-ui/core/Paper'

const Header = () => (
    <header>
        <Paper>SITE TITLE</Paper>
    </header>
)
const Footer = () => (
    <footer>
        <Paper>Copyright</Paper>
    </footer>
)
const Layout = ({ children }) => (
    <div>
        <Header/>

        <Paper>{children}</Paper>

        <Footer/>        
    </div>
)
export default Layout
```

とりあえず上中下と分けました。テンプレートで今作った Layoutタグを使います。

```js:title=src/templates/post-template.js
    import Layout from "../components/layout.js"
    ...
    return (
        <Layout>
            <h2>{node.frontmatter.title}</h2>
            <MDXRenderer>
                {node.body}
            </MDXRenderer>
        </Layout>
    )
    ...
```

### Appbar
よくある appbar をヘッダに配置してみます。

```js:title=src/components/layout.js
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
...
const Header = () => (
    <header>
        <AppBar position="static">
            <Toolbar>
                SITE TITLE
            </Toolbar>    
        </AppBar>
    </header>    
)
```
### 中段をメインとサイドバーに分割

grid を使って 9:3 に分けます。モバイル端末(xs)の場合は上下に配置します。

```js:title=src/components/layout.js
import Grid from '@material-ui/core/Grid'
...
const Layout = ({ children }) => (
    <div>
        <Header/>

        <Grid container spacing={3}>
            <Grid item sm={9} xs={12}>
                <Paper>{children}</Paper>
            </Grid>

            <Grid item sm={3} xs={12}>
                <Sidebar/>
            </Grid>
        </Grid>
        
        <Footer/>
    </div>
```

サイドバーにはプロフィール情報やアーカイブなどを配置する予定に。

```js:title=src/components/sidebar.js
const Sidebar = () => (
    <Paper>
        <h3>PROFILE</h3>
        <h3>RECENT POSTS</h3>
        <h3>ARCHIVES</h3>
    </Paper>
)
```

## CSSを使う
いくつかやり方があります。

### Global CSS
```css:title=src/components/layout.css
body {
  background-color: red;
}
```

と css を定義して、

```js:title=src/components/layout.js
import './layout.css'
...
```

こうしとけば layout.js を import すればそのまま css も入ってきます。

### CSS modules
```css:title=src/components/post.module.css
.title {
    font-weight: bold;
}
```
と .module.css という名前で保存して、

```js:title=src/templates/post-template.css
import postStyles '../components/post.module.css'

    return (
        <Layout>
            <h2 className={postStyles.title}>{node.frontmatter.title}</h2>
...            
```

とimportすると、attribute でクラスとして参照できます。


### CSS in JS
styled とか makeStyle とかあるけど、詳しくは docs を。


## やったこと
こんな感じに：


image: [gatsby-4](/images/gatsby-4.png) 
