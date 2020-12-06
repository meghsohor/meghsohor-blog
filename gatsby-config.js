require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `MeghSohor`,
    description: `I am Shafiqul Islam Shuvo and I am a Software Developer. I write blog posts on HTML, CSS, SASS, JavaScript, Angular, React, Redux, Material, Bootstrap, TypeScript`,
    author: `@meghsohor`,
    siteURL: "https://www.meghsohor.com",
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-catch-links`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      // path added for Blog posts
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/contents/posts`,
      },
    },
    {
      // path added for portfolio posts
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `portfolio`,
        path: `${__dirname}/src/contents/projects`,
      },
    },
    {
      // path added for job posts
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `career`,
        path: `${__dirname}/src/contents/jobs`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MeghSohor Blog`,
        short_name: `MeghSohor`,
        start_url: `https://www.meghsohor.com/`,
        background_color: `#f0f0f0`,
        theme_color: `#0f5d9c`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "zenburn",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT, // Mailchimp endpoint should be added here
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
