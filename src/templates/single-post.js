import React from 'react'
import { graphql, Link } from 'gatsby'
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap"
import Img from 'gatsby-image'
import { DiscussionEmbed } from 'disqus-react'


import Layout from '../components/layout'
import SEO from '../components/seo'

import { slugify } from '../utils/utilityFunctions'
import authors from '../utils/authors'


const SinglePost = ({data, pageContext}) => {
    const post = data.markdownRemark.frontmatter
    const author = authors.find(author => author.name === post.author)

    const baseUrl = 'https://gatsbytutorial.co.uk/'
    const disqusShortname = 'meghsohor'
    const disqusConfig = {
        identifier: data.markdownRemark.id,
        title: post.title,
        url: baseUrl + pageContext.slug
    }

    return (
      <Layout
        postAuthor={{
          ...author,
          authorImageFluid: data.file.childImageSharp.fluid,
        }}
      >
        <SEO title={post.title} />

        <Card>
          <Img
            className="card-img-top"
            fluid={post.image.childImageSharp.fluid}
          />
          <CardBody>
            <CardTitle tag="h4">{post.title}</CardTitle>
            <CardSubtitle className="text-muted">{post.date}</CardSubtitle>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            />

            <ul className="post-tags">
              {post.tags.map((tag, i) => (
                <li key={i}>
                  <Link
                    className="badge badge-primary p-2 px-2 tag"
                    to={`/tag/${slugify(tag)}`}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        <h3 className="text-center mt-5">Share this post</h3>
        <div className="text-center social-share-links">
          <ul>
            <li>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${baseUrl}${pageContext.slug}`}
                className="facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-facebook"></i>
              </a>
            </li>
            <li>
              <a
                href={`https://www.twitter.com/share?url=${baseUrl}${pageContext.slug}&text=${post.title}&via=meghsohor`}
                className="twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href={`https://plus.google.com/share?url=${baseUrl}${pageContext.slug}`}
                className="google"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-google"></i>
              </a>
            </li>
            <li>
              <a
                href={`https://www.linkedin.com/shareArticle?url=${baseUrl}${pageContext.slug}`}
                className="linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-2x fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>

        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </Layout>
    )
}

export const postQuery = graphql`
  query blogPostBySlug($slug: String!, $imageUrl: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        author
        image {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
    file(relativePath: { eq: $imageUrl }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default SinglePost
