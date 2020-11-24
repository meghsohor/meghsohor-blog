import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import SEO from "../components/seo"


const SearchPage = () => {


  return (
    <Layout pageTitle="Search Posts">
      <SEO title="Search Posts related to Software Development in Meghsohor Blog" />
      <Helmet>
        <script
          async
          src="https://cse.google.com/cse.js?cx=4659ad6964b0d6696"
        ></script>
      </Helmet>
      <div className="gcse-search"></div>
    </Layout>
  )
}

export default SearchPage
