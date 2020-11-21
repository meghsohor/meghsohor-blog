import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import PaginationLinks from "../components/pagination"

const PostList = props => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = props.pageContext
  return (
    <Layout pageTitle={`Blog Page: ${currentPage}`}>
      <SEO title="MeghSohor Blog" />

      {posts.map(({ node }) => {
        const post = {
          ...node.frontmatter,
          image: node.frontmatter.image.childImageSharp.fluid,
          body: node.excerpt,
          path: "/blog/" + node.fields.slug,
        }
        return <Post key={node.id} post={post} />
      })}

      <PaginationLinks
        currentPage={currentPage}
        numberOfPages={numberOfPages}
      />
    </Layout>
  )
}

export const postListQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
      filter: { frontmatter: { posttype: { eq: "blog" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
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

export default PostList
