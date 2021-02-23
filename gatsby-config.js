/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const config = require('./config.js')

const crumbLabelUpdates = (config.directory_labels) ? Object.keys(config.directory_labels).map(k=>{ 
  return { pathname: k, crumbLabel: config.directory_labels[k] }
}) : []

console.log("crumblabelupdates: ", crumbLabelUpdates)

module.exports = {
  siteMetadata: config.siteMetadata,
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
          `gatsby-remark-autolink-headers`,

          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 600,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
            },
          },    

          'gatsby-remark-prismjs-title',
          //`gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              alias: { js: 'javascript', sh: 'bash', md: 'markdown' },
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
        useAutoGen: true,
        autoGenHomeLabel: `Home`,
        excludes: [
          `**/dev-404-page/**`,
          `**/404/**`,
          `**/404.html`,
          `**/offline-plugin-app-shell-fallback/**`
        ],
        excludeOptions: {
          separator: '.'
        },
        crumbLabelUpdates: crumbLabelUpdates,
        crumbLabelUpdatesOrig: [
          {
            pathname: '/game',
            crumbLabel: 'ゲーム'
          },
          {
            pathname: '/game/kancolle',
            crumbLabel: '艦これ'
          },
          {
            pathname: '/game/kancolle/event',
            crumbLabel: 'イベント'
          },
          {
            pathname: '/wot',
            crumbLabel: 'World of Tanks'
          },

          {
            pathname: '/workout',
            crumbLabel: 'ワークアウト'
          },
          {
            pathname: '/figureskating',
            crumbLabel: 'フィギュアスケート'
          },
          {
            pathname: '/figureskating/practise',
            crumbLabel: '銀盤練習'
          },
          {
            pathname: '/hobby',
            crumbLabel: '趣味'
          },
          {
            pathname: '/software',
            crumbLabel: 'ソフトウェア'
          },


        ],
        //trailingSlashes: true,
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-emotion`,
  ],
}
