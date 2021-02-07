/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const config = require('./config.js')

module.exports = {
  siteMetadata: {
    title: "Ataru Kodaka Site",
    author: "Ataru KODAKA",
    email: "atarukodaka@gmail.com",
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
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,      
          }
        ]
      },
    },
    `gatsby-transformer-sharp`,    
    `gatsby-plugin-sharp`,
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-emotion`,    
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
            },
          },
        ],
      },
    },
    
  ],
}
