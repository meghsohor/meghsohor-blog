import React from "react"
import { Card, CardText, CardBody, CardTitle, Button, Row } from 'reactstrap'

import Layout from "../components/layout"
import SEO from "../components/seo"

import authors from '../utils/authors'
import { slugify } from '../utils/utilityFunctions'
import JohnImg from '../images/john.jpg'
import JaneImg from '../images/jane.jpg'

const TeamPage = () => (
  <Layout pageTitle="Team Page">
    <SEO title="Our Team" keywords={['gatsby', 'react', 'tech', 'blog']} />
    
    <Row className="align-items-stretch mb-3">
      <div className="col-md-3">
        <img src={JohnImg} alt="John Profile"/>
      </div>
      <div className="col-md-8">
        <Card className="mb-0" style={{height: '100%'}}>
          <CardBody>
            <CardTitle>{authors[0].name}</CardTitle>
            <CardText>{authors[0].bio}</CardText>
            <Button color="primary" href={`/author/${slugify(authors[0].name)}`}>View Posts</Button>
          </CardBody>
        </Card>
      </div>
    </Row>

    <Row className="align-items-stretch mb-3">
      <div className="col-md-3">
        <img src={JaneImg} alt="Jane Profile" />
      </div>
      <div className="col-md-8">
        <Card className="mb-0" style={{ height: '100%' }}>
          <CardBody>
            <CardTitle>{authors[1].name}</CardTitle>
            <CardText>{authors[1].bio}</CardText>
            <Button color="primary" href={`/author/${slugify(authors[1].name)}`}>View Posts</Button>
          </CardBody>
        </Card>
      </div>
    </Row>
  </Layout>
)

export default TeamPage
