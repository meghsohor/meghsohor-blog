import React from "react"
import { graphql, StaticQuery } from "gatsby"
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Badge,
  CardSubtitle,
} from "reactstrap"

const Career = () => (
  <StaticQuery
    query={careerQuery}
    render={data => {
      const career = data.allMarkdownRemark.edges

      return (
        <section className="career-section py-5 bg-white">
          <div className="container">
            <h2 className="section-heading">
              <span>Job Experience</span>
            </h2>

            <div className="row align-items-stretch">
              {career.length &&
                career.map(({ node }) => {
                  const job = {
                    ...node.frontmatter,
                    id: node.id,
                    html: node.html,
                  }

                  return (
                    <div
                      className="col-xl-6 col-md-6 d-flex flex-column"
                      key={job.id}
                    >
                      <div className="job-period">
                        {job.fromdate} - {job.todate}
                      </div>
                      <Card className="career-card mb-5">
                        <CardBody>
                          <CardTitle tag="h5">{job.title}</CardTitle>
                          <CardSubtitle>{job.company}</CardSubtitle>

                          {job.tasks && job.tasks.length && (
                            <CardText tag="div">
                              <ul className="check-list">
                                {job.tasks.map((task, i) => (
                                  <li key={i}>{task}</li>
                                ))}
                              </ul>
                            </CardText>
                          )}

                          <CardText
                            tag="div"
                            dangerouslySetInnerHTML={{ __html: job.html }}
                            className="mb-auto"
                          />

                          <div className="portfolio-tags">
                            {job.tags &&
                              job.tags.length &&
                              job.tags.map(tag => (
                                <Badge key={tag} color="default">
                                  {tag}
                                </Badge>
                              ))}
                          </div>
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

export const careerQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { posttype: { eq: "career" } } }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            company
            date
            tasks
            fromdate
            todate
            tags
          }
        }
      }
    }
  }
`

export default Career
