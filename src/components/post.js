import React from 'react'
import { Link } from 'gatsby'
import { Card, CardBody, CardText, CardTitle, CardSubtitle } from 'reactstrap'
import Img from 'gatsby-image'
import { slugify } from '../utils/utilityFunctions'

const Post = (props) => {
    const { title, author, path, date, body, image, tags } = props.post;

    return (
      <Card className={props.noMargin ? "" : "mb-5"}>
        <Link to={path}>
          <Img className="card-img-top" fluid={image} />
        </Link>
        <CardBody>
          <CardTitle tag="h5">
            <Link to={path}>{title}</Link>
          </CardTitle>
          <CardSubtitle className="text-muted">{date}</CardSubtitle>
          <hr />
          <CardText>{body}</CardText>

          <div className="d-flex align-items-center">
            <ul className="post-tags">
              {tags.map((tag, i) => (
                <li key={i}>
                  <Link
                    className="badge badge-default p-2 px-2 tag"
                    to={`/tag/${slugify(tag)}`}
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>

            <Link to={path} className="btn btn-outline-primary ml-auto">
              Read More
            </Link>
          </div>
        </CardBody>
      </Card>
    )
}

export default Post
