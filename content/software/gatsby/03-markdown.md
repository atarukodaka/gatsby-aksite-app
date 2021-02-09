---
title: Gatsby - Markdown
date: 2021-02-09
---

## やること
- markdown で書けるようにする
- 素のmarkdown ではなく MDX を使う
  - component が使えるのでうれしい

## インストールと設定
ふつーはmarkdown-transfer が標準ですが、MDXのほうが便利なのでそちらを入れます。後で入れ替えるも二度手間ですし。とはいえしばらくはMDX独自の機能は使いません。

```sh
npm install --save gatsby-plugin-mdx @mdx-js/mdx @mdx-js/react
```

```js:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`]
      }
    }
  ]
}
```

拡張子は .md, .mdx 両方とも MDX扱いにしときます。

```md:title=src/pages/awesome.md
---
title: markdown is awesome
date: 2020-02-02
---

## THIS IS AWESOME MARKDOWN

- foo
- bar
  - baz
```

これで localhost:8000/awesome/ で表示されます。

## 文書は別場所に
マークアップ文書群は別に分けたいというのと、src/pages/に置いたままだと自動でいろいろ処理されてしまうため、自分でごにょごにょとできない（具体的には allMdx.nodes に入ってこない）という都合もあるので、content/以下に置くことにします。

そのフォルダをソースとして読み出しますよ、というのを追加設定します。プラグインのインストールです。

```sh
npm install --save gatsby-source-filesystem
mkdir content
mv src/pages/awesome.md content
```

```diff-js:title=gatsby-config.js
module.exports = {
  plugins: [
+    {
+      resolve: `gatsby-source-filesystem`,
+      options: {
+        name: `content`,
+        path: `${__dirname}/content`,
+      }b
    ...
```

これで content/ 以下のファイルも読み出せるようになりました。
ただし先程のように /awesome への書き出しは自動でやってくれなくなったので、自分で処理を実装する必要があります。

## マークアップ文書郡を取り出す
再び graphQL interface で遊びます。

gatsby-plugin-mdx を入れると、allMdx と mdx というクエリが使えるようになります。

```js:title=graphql
query MyQuery {
  allMdx {
    totalCount
    nodes {
      slug
      frontmatter {
        title
      }
      body
    }
  }
}

これでいろいろ取れます。

手順としては、

+ クエリで mdx リソースのノード群を取り出す
+ それぞれについてテンプレートファイルに当てはめページを作成する。

となります。ページ作成は、createPage() という関数が用意されてるので、それを使う形になります。
新規に gatsby-node.js を作成します：

```js:title=gatsby-node.js

exports.
```



