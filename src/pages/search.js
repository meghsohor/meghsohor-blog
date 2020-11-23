import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SearchPage = () => {
    //const googleSearchAPI = `https://cse.google.com/cse.js?cx=${process.env.GOOGLE_SEARCH_API}`
    //console.log(googleSearchAPI)

    return (
      <Layout pageTitle="Search Posts">
        <SEO title="Search Posts related to Software Development in Meghsohor Blog" />
        <Helmet>
          <script
            async
            src={`https://cse.google.com/cse.js?cx=0fe6e6ee3ad402b43`}
          ></script>
        </Helmet>
      </Layout>
    )
}

export default SearchPage
