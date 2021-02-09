/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

//const config = require('./config.js')

module.exports = {
  siteMetadata: {
    title: "Ataru Kodaka Site",
    author: "Ataru KODAKA",
    description: '',
    siteUrl: `http://localhost:8000/`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          'gatsby-remark-prismjs-title',
          //`gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              alias: {js: 'javascript', sh: 'bash', md: 'markdown'},
            }
          },
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          },
        ]
      }
    },
    {
      resolve: `gatsby-plugin-breadcrumb`,
      options: {
      // useAutoGen: required 'true' to use autogen
      useAutoGen: true,
      // autoGenHomeLabel: optional 'Home' is default
      autoGenHomeLabel: `Home`,
      // exlude: optional, include this array to exclude paths you don't want to
      // generate breadcrumbs for (see below for details).
      excludes: [
        `**/dev-404-page/**`,
        `**/404/**`,
        `**/404.html`,
        `**/offline-plugin-app-shell-fallback/**`
      ],
      // isMatchOptions: optional, include this object to configure the wildcard-match library.
      excludeOptions: {
        separator: '.'
      },
      // crumbLabelUpdates: optional, update specific crumbLabels in the path
      crumbLabelUpdates: [
        {
          pathname: '/book',
          crumbLabel: 'Books'
        }
      ],
      // trailingSlashes: optional, will add trailing slashes to the end
      // of crumb pathnames. default is false
      trailingSlashes: false,
      }      
    },
    //`gatsby-plugin-typography`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-emotion`,
  ],
}
