import React from "react"
import { Card, CardText, CardBody, CardTitle, Button, Row } from 'reactstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"

import authors from '../utils/authors'
import { slugify } from '../utils/utilityFunctions'

const TeamPage = () => (
  <Layout pageTitle="Team Page">
    <SEO title="Our Team" keywords={["gatsby", "react", "tech", "blog"]} />

    {authors.map(author => (
      <Row className="align-items-stretch mb-3">
        <div className="col-md-3">
          <img src={`images/${author.imageUrl}`} alt={author.name} />
        </div>
        <div className="col-md-8">
          <Card className="mb-0" style={{ height: "100%" }}>
            <CardBody>
              <CardTitle>{author.name}</CardTitle>
              <CardText>{author.bio}</CardText>
              <Button color="primary" href={`/author/${slugify(author.name)}`}>
                View Posts
              </Button>
            </CardBody>
          </Card>
        </div>
      </Row>
    ))}
  </Layout>
)

export default TeamPage
