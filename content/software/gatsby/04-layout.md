---
title: Gatsby - [4] Layout
date: 2021-02-09 04:00:00
---

## やること

- レイアウトや身だしなみを整えます
- レスポンシブルデザインは material-ui で
- css は emotion-ui の styled で

よくある、上部にタイトルなどのヘッダ、真ん中の左に本文、右にサイドバー、そして下部にフッターという構成できいます。

## material-ui のインストール
```sh
```npm i --save gatsby-plugin-material-ui @material-ui/core 
```

```js:title=src/components/layout.js
import React from "react"
import { Link } from "gatsby"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Header from "./header.js"
import Footer from "./footer.js"
import Sidebar from "./sidebar.js"

const Layout = ({ children }) => {
    return (
        <Container>
            <Header />                    
            <Grid container spacing={4}>
                <Grid item xs={12} sm={9}>
                    <Container>
                        {children}
                    </Container>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Sidebar />
                </Grid>
            </Grid>
            <Footer />
        </Container>
    )
}

export default Layout
```

Grid を使います。横12分割で、smデバイス（ipadとか）以上では 9:メイン, 3:サイドバー、xmデバイスでは縦に並べます。

