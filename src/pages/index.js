import React, { Fragment } from "react"

import "../styles/main.css"

import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import Hero from "../components/hero"
import About from "../components/about"
import Portfolio from "../components/portfolio"
import Career from "../components/career"
import Blog from "../components/blog"

const IndexPage = () => (
  <Fragment>
    <SEO title="Home" />

    <main id="page-content">
      <Header siteTitle={`MeghSohor`} />
      <Hero />
      <About />
      <Portfolio />
      <Career />
      <Blog />
      <Footer />
    </main>
  </Fragment>
)

export default IndexPage
