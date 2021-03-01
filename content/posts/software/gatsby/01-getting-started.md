---
title: Gatsby - [1] Getting Started
date: 2021-02-09 01:00:00
image: gatsby.png
---

## TL;DR
React, GraphQL, webpack などのフロントエンド、クエリ各種技術を詰め込んだ静的サイトジェネレータらしい。
以前はmiddlemanを使っていたが、gatsbyに乗り換えてみたのでその記録。

なるべくプレインな状態から始めて、少しずつ肉付けしていく。

## 前提知識

javascriptはjquery 全盛時代脳のままなので、ES6程度までにはアップデートしないといけない模様。

- export, module, default, named あたりの意味と役割
- 配列：map, forEach の使い方
- アロー関数、引数の扱い
- `` によるリテラルテンプレート

```js
// map, forEach
nodes.map(node => {}>)
nodes.forEach(nodes => {})

const set = [...new Set(nodes)] // uniq
const compact = ndoes.filter(v=>v) // compact

// 大体同じ
const foo = function(a){ }  
const foo = (a) => { }

const foo = a => {} // 引数が一つのときは括弧省略可能
const foo = ( { data, pageContext } ) => {} // TODO
```
## インストール
nodejsベースなので適宜入れる。

```sh
sudo apt install -y nodejs npm
sudo npm install n -g
npm install --global gatsby-cli
```

### hello world starter から始める
starter としてdefault や blog　があるが、それらよりhello-worldのほうが余計なのが少ないのでそれを使う：

```sh
gatsby new my-hello-world-starter https://github.com/gatsbyjs/gatsby-starter-hello-world
cd my-hello-world-starter/
gatsby develop
(あるいは npm run develop)
```

で localhost:8000 にアクセスできる。

```sh
gatsby build
(あるいは npm run build)
```

で public/ 以下に出力される。

## sourth filetype

src/pages/ 以下は自動的に読んで出力してくれる。

```js:title=src/pages/about.js
import React from "react"

const AboutPage = () => {
    return (<div>I AM A PEN.</div>)
}

export default AboutPage
```

のように、about.jsにHTMLっぽいけどXMLを返す関数を作って export すると、 /about で出力する。返り値は必す単一要素で括ること。

関数名は何でもよくて、default を named とすれば

```js
import React from "react"

export default function () { return (<div>I AM A PEN.</div>)}
```

でも構わない。

## コンポーネント

src/components/*.js でコンポーネント（部品っぽいの）を定義できる。
自作タグみたいなもの。

```js:title=src/components/hello.js
import React from "react"

const Hello = ( ) => {
    return (
        <big>HELLO GUYS!!!</big>
    )
}

export default Hello
```

これをimport してあげると、大きな声で挨拶してくれる Hello タグを使うことができる：

```js:title=src/pages/about.js
...
import "../components/hello.js"

const AboutPage = () => {
    return (<div><Hello/></div>)
}
...
```

## まとめ

- インストールできた
- src/pages/ から　localhost:8000/ に出力できた
- コンポーネント（独自タグ）を作って使えた

<Link to="../02-graphql">NEXT: 第二回：GraphQL</Link>