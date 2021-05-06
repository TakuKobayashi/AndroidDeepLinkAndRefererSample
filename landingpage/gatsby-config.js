'use strict'

module.exports = {
  // Github PagesにDeployする時に必要
  pathPrefix: '/AndroidDeepLinkAndRefererSample',
  siteMetadata: {
    title: 'AndroidDeepLinkAndRefererSample',
    description: 'A starter kit for TypeScript-based Gatsby projects with sensible defaults.',
    keywords: 'Android, gatsby, typescript, react, referer',
    siteUrl: 'https://takukobayashi.github.io/AndroidDeepLinkAndRefererSample/',
    author: {
      name: 'taptappun',
      url: 'https://github.com/TakuKobayashi',
      email: 'keep_slimbody@yahoo.co.jp'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem'
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://takukobayashi.github.io/AndroidDeepLinkAndRefererSample/'
      }
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet'
  ]
}
