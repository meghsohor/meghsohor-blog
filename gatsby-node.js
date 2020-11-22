const { slugify } = require('./src/utils/utilityFunctions');
const path = require('path');
const _= require('lodash')

const authors = require('./src/utils/authors');

exports.onCreateNode = ({ node, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slugFromTitle = slugify(node.frontmatter.title);
        createNodeField({
            node,
            name: 'slug',
            value: slugFromTitle
        })
    }
}

exports.createPages = async ({actions, graphql}) => {
    const { createPage } = actions;
    const templates = {
        singlePost: path.resolve('src/templates/single-post.js'),
        tagsPage: path.resolve('src/templates/tags-page.js'),
        tagPosts: path.resolve('src/templates/tag-posts.js'),
        postList: path.resolve('src/templates/post-list.js'),
        authorPosts: path.resolve('src/templates/author-posts.js'),
    };

    const res = await graphql(`
      {
        allMarkdownRemark(
          filter: { frontmatter: { posttype: { eq: "blog" } } }
        ) {
          edges {
            node {
              frontmatter {
                author
                tags
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    if (res.errors) 
        return Promise.reject(res.errors);

    const posts = res.data.allMarkdownRemark.edges;

    // Create Single post page
    posts.forEach(({node}) => {
        createPage({
          path: "/blog/" + node.fields.slug,
          component: templates.singlePost,
          context: {
            slug: node.fields.slug,
            // Find author imageUrl from authors and pass to Single Post template
            imageUrl: authors.find(
              author => author.name === node.frontmatter.author
            ).imageUrl,
          },
        })
    });

    // Get all tags from the posts
    let tags = [];
    _.each(posts, edge => {
        if (_.get(edge, 'node.frontmatter.tags')) {
            tags = tags.concat(edge.node.frontmatter.tags);
        }
    });

    // Get the count for each tag
    let tagPostCounts = {}
    tags.forEach(tag => {
        tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1;
    });

    tags = _.uniq(tags);

    // Create tags page where all the tags and the number of post count against each tag will be displayed
    /* createPage({
        path: '/tags',
        component: templates.tagsPage,
        context: {
            tags,
            tagPostCounts
        }
    }); */

    // Create tag posts pages
    tags.forEach(tag => {
        createPage({
            path: `/tag/${slugify(tag)}`,
            component: templates.tagPosts,
            context: {
                tag,
            }
        })
    });

    // Create Blog posts pages
    const postPerPage = 5; // How many posts to be shown in each page
    const numberOfPages = Math.ceil(posts.length / postPerPage);

    if (numberOfPages > 1) {
      Array.from({ length: numberOfPages }).forEach((_, index) => {
        const isFirstPage = index === 0
        const currentPage = index + 1

        if (isFirstPage) return

        createPage({
          path: `blog/page/${currentPage}`,
          component: templates.postList,
          context: {
            limit: postPerPage,
            skip: index * postPerPage,
            currentPage,
            numberOfPages,
          },
        })
      })
    }

    // Create author pages
    /* authors.forEach(author => {
        createPage({
            path: `/author/${slugify(author.name)}`,
            component: templates.authorPosts,
            context: {
                authorName: author.name,
                authorImg: author.imageUrl
            }
        })
    }) */
}
