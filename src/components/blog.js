import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Post from './post'

const Blog = () => (
  <StaticQuery
    query={blogQuery}
    render={data => {
      const posts = data.allMarkdownRemark.edges

      return (
        <section className="blog-section py-5">
          <div className="container">
            <h2 className="section-heading">
              <span>My Blog</span>
            </h2>

            <div className="row align-items-stretch">
              {posts.length &&
                posts.map(({ node }) => {
                  const post = {
                    ...node.frontmatter,
                    image: node.frontmatter.image.childImageSharp.fluid,
                    body: node.excerpt,
                    path: '/blog/' + node.fields.slug,
                  }

                  return (
                    <div
                      className="col-xl-4 col-md-6 d-flex flex-column mb-4"
                      key={node.id}
                    >
                      <Post post={post} noMargin />
                    </div>
                  )
                })}
            </div>

            <div className="d-flex justify-content-center">
                <a href="/blog" className="btn btn-primary">View All Posts</a>
            </div>
          </div>
        </section>
      )
    }}
  />
)

export const blogQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
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

export default Blog
