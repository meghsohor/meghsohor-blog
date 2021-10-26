import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { Card, CardText, CardBody, CardTitle, Badge } from "reactstrap"
import Img from "gatsby-image"


const Portfolio = () => (

  <StaticQuery
    query={portfolioQuery}
    render={data => {
      const portfolios = data.allMarkdownRemark.edges;
      return (
        <section className="portfolio-section pt-5 pb-4">
          <div className="container">
            <h2 className="section-heading">
              <span>Portfolio</span>
            </h2>

            <div className="row align-items-stretch">
              {portfolios.length && portfolios.map(({node}) => {
                const portfolio = {
                  ...node.frontmatter,
                  fluid: node.frontmatter.image.childImageSharp.fluid,
                  id: node.id,
                  html: node.html,
                }

                return (
                  <div className="col-xl-4 col-md-6 mb-4" key={portfolio.id}>
                    <Card className="portfolio-card">
                      <Img className="card-img-top" fluid={portfolio.fluid} />
                      <CardBody>
                        <CardTitle tag="h5">{portfolio.title}</CardTitle>
                        <div dangerouslySetInnerHTML={{ __html: `<p>${portfolio.html}</p>` }}></div>
                        {/* <CardText
                          dangerouslySetInnerHTML={{ __html: portfolio.html }}
                        /> */}

                        <div className="portfolio-tags mt-auto">
                          {portfolio.tags &&
                            portfolio.tags.length &&
                            portfolio.tags.map(tag => (
                              <Badge
                                key={tag}
                                className="text-capitalize"
                                color="default"
                              >
                                {tag}
                              </Badge>
                            ))}
                        </div>
                        <a
                          href={portfolio.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-secondary ml-auto"
                        >
                          View Live
                        </a>
                      </CardBody>
                    </Card>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )
    }}
  />
)


export const portfolioQuery = graphql`
  query{
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { posttype: { eq: "portfolio" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            date(formatString: "MMM Do YYYY")
            link
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Portfolio
