import { Link } from 'gatsby';
import React from 'react'
import { Badge } from 'reactstrap';

import Layout from '../components/layout'
import SEO from '../components/seo'
import { slugify } from '../utils/utilityFunctions';


const TagsPage = ({ pageContext }) => {
    console.log(pageContext)
    const { tags, tagPostCounts } = pageContext;

    return (
        <Layout pageTitle="All Tags">
            <SEO title="All tags" keywords={['tags', 'topics']} />
            {tags && 
                <ul>
                    {
                        tags.map(tag => (
                            <li key={tag} className="mb-2">
                                <Link to={`/tag/${slugify(tag)}`} className="btn btn-primary">
                                    {tag} &nbsp;
                                    <Badge color="light">{tagPostCounts[tag]}</Badge>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            }
        </Layout>
    )
}

export default TagsPage
