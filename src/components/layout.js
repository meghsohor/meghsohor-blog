/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Row, Col } from 'reactstrap'

import '../styles/main.css'

import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"

const Layout = ({ children, pageTitle, postAuthor, hideSidebar }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `MeghSohor`} />
      <main id="page-content">
        <div className="container">
          {pageTitle && <h1 className="text-center mb-3">{pageTitle}</h1>}

          {hideSidebar ? (
            <Row>
              <Col md="12">{children}</Col>
            </Row>
          ) : (
            <Row>
              <Col md="8">{children}</Col>
              <Col md="4">
                <Sidebar postAuthor={postAuthor} />
              </Col>
            </Row>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
