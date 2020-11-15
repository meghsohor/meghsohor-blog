import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Post from '../components/post'

import authors from '../utils/authors'

const AuthorPosts = ({ data, pageContext }) => {
    console.log(pageContext)
    const { totalCount } = data.allMarkdownRemark
    const author = authors.find(x => x.name === pageContext.authorName)
    const pageHeader = `${totalCount} post${totalCount === 1 ? '' : 's' } by ${author.name}`

    return (
        <Layout pageTitle={pageHeader}
            postAuthor={{...author, authorImageFluid: data.file.childImageSharp.fluid}}
        >
            <SEO title={``} />

            {
                data.allMarkdownRemark.edges.map(({ node }) => {
                    const post = {
                        ...node.frontmatter,
                        image: node.frontmatter.image.childImageSharp.fluid,
                        body: node.excerpt,
                        path: '/' + node.fields.slug
                    }
                    return <Post key={node.id} post={post} />
                })
            }
        </Layout>
    )
}

export const authorPostsQuery = graphql`
    query($authorName:String!, $authorImg:String!){
        allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: { frontmatter: { author: { eq: $authorName } } }
        ){
            totalCount
            edges{
                node{
                    id
                    frontmatter{
                        title
                        date(formatString: "MMM Do YYYY")
                        author
                        tags
                        image{
                            childImageSharp{
                                fluid(maxWidth: 800){
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                    fields{
                        slug
                    }
                    excerpt
                }
            }
        }
        file(relativePath: {eq: $authorImg}) {
            childImageSharp{
                fluid(maxWidth: 300){
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`

export default AuthorPosts
