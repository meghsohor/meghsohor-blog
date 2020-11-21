import { graphql, StaticQuery } from "gatsby"
import React, { Fragment } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Post from "../components/post"
import PaginationLinks from "../components/pagination"

const BlogPage = () => (
  <Layout pageTitle="MeghSohor Blog">
    <SEO title="Blog" />
    <StaticQuery
      query={blogQuery}
      render={data => {
        const numberOfPages = Math.ceil(data.allMarkdownRemark.totalCount / 2);
        console.log(numberOfPages)

        return (
          <Fragment>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const post = {
                ...node.frontmatter,
                image: node.frontmatter.image.childImageSharp.fluid,
                body: node.excerpt,
                path: node.fields.slug,
              }
              return <Post key={node.id} post={post} />
            })}

            {numberOfPages > 1 && (
              <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
            )}
          </Fragment>
        )
      }}
    />
  </Layout>
)

export const blogQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
      filter: { frontmatter: { posttype: { eq: "blog" } } }
    ) {
      totalCount
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

export default BlogPage
