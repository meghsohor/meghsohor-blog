import React, { useState } from "react"
import { graphql, Link, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import addToMailchimp from "gatsby-plugin-mailchimp"
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
} from "reactstrap"

import { emailValidator } from '../utils/utilityFunctions'

const Sidebar = ({ postAuthor }) => {
  const [userEmail, setUserEmail] = useState('');
  const [invalidUserEmail, setInvalidUserEmail] = useState(false)
  const [subscriptionModal, setSubscriptionModal] = useState(false);


  const toggleSubscriptionModal = () => setSubscriptionModal(!subscriptionModal)

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (emailValidator(userEmail)) {
      setInvalidUserEmail(false);
      
      const result = await addToMailchimp(userEmail);
      console.log(result);
      
      toggleSubscriptionModal();
      setUserEmail("");
    } else {
      setInvalidUserEmail(true);
      console.log("Invalid email address");
    }
  }

  return (
    <aside>
      {postAuthor && (
        <Card className="mb-4">
          <Img
            className="card-img-top"
            fluid={postAuthor.authorImageFluid}
            alt={postAuthor.name}
          />
          <CardBody>
            <CardTitle tag="h5" className="text-center text-uppercase mb-3">
              {postAuthor.name}
            </CardTitle>
            <CardText>{postAuthor.bio}</CardText>
            <div className="author-social-links text-center">
              <ul>
                <li>
                  <a
                    href={postAuthor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="linkedin"
                  >
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={postAuthor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram"
                  >
                    <i className="fa fa-github"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={postAuthor.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="twitter"
                  >
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href={postAuthor.stackoverflow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="google"
                  >
                    <i className="fa fa-stack-overflow"></i>
                  </a>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      )}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5" className="text-center text-uppercase mb-3">
            Newsletter
          </CardTitle>
          <Form className="text-center" onSubmit={handleSignUp} noValidate>
            <FormGroup>
              <Input
                type="email"
                placeholder="Your email address..."
                aria-label="Email for subscription"
                value={userEmail}
                onChange={e => setUserEmail(e.target.value)}
                invalid={invalidUserEmail}
                required
              />
              <FormFeedback className="text-left">Invalid email address</FormFeedback>
            </FormGroup>
            <button type="submit" className="btn btn-outline-success btn-block">
              Subscribe
            </button>
          </Form>
        </CardBody>
      </Card>

      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5" className="text-center text-uppercase mb-3">
            Advertisement
          </CardTitle>
          <img src="https://via.placeholder.com/320x200" alt="advertisement" />
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardBody className="pb-0">
          <CardTitle tag="h5" className="text-center text-uppercase mb-3">
            Recent Posts
          </CardTitle>
          <StaticQuery
            query={sidebarQuery}
            render={data => {
              return data.allMarkdownRemark.edges.map(({ node }) => {
                const post = {
                  ...node.frontmatter,
                  path: "/blog/" + node.fields.slug,
                  fluid: node.frontmatter.image.childImageSharp.fluid,
                }
                return (
                  <Card key={node.id} className="mb-4">
                    <Link to={post.path}>
                      <Img
                        className="card-img-top"
                        fluid={post.fluid}
                        alt={post.title}
                      />
                      <CardBody>
                        <CardTitle className="h6 mb-0">{post.title}</CardTitle>
                      </CardBody>
                    </Link>
                  </Card>
                )
              })
            }}
          />
        </CardBody>
      </Card>

      <Modal
        isOpen={subscriptionModal}
        toggle={toggleSubscriptionModal}
        centered
      >
        <ModalHeader tag="h4">Thank You!</ModalHeader>
        <ModalBody className="py-4">
          <p>You have successfully subscribed to our newsletter.</p>
          <div className="text-right">
            <button
              className="btn btn-secondary"
              onClick={toggleSubscriptionModal}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </Modal>
    </aside>
  )
}

const sidebarQuery = graphql`
  query sidebarQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
      filter: { frontmatter: { posttype: { eq: "blog" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 320) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Sidebar
