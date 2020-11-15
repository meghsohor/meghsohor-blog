import React, { Fragment } from "react"


import Header from "../components/header"
import Footer from "../components/footer"
import SEO from "../components/seo"
import Hero from "../components/hero"
import About from "../components/about"

const IndexPage = () => (
  <Fragment>
    <SEO title="Home" />

    <main>
      <Header siteTitle={`MeghSohor`} />
      <Hero />
      <About />
      <Footer />
    </main>
  </Fragment>
)

export default IndexPage
