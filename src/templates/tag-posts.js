import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Post from '../components/post'

const TagPosts = ({ data, pageContext }) => {
    const { tag } = pageContext
    const { totalCount } = data.allMarkdownRemark
    const pageHeader = `${totalCount} post${totalCount === 1 ? '' : 's' } tagged with "${tag}"`
    return (
        <Layout pageTitle={pageHeader}>
            <SEO title={pageHeader} keywords={tag} />

            {
                data.allMarkdownRemark.edges.map(({ node }) => {
                    const post = {
                        ...node.frontmatter,
                        image: node.frontmatter.image.childImageSharp.fluid,
                        body: node.excerpt,
                        path: '/blog/' + node.fields.slug
                    }
                    return <Post key={node.id} post={post} />
                })
            }
        </Layout>
    )
}

export const tagQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] }, posttype: { eq: "blog" } }
      }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            author
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default TagPosts
