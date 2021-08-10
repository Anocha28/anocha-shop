import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Jumbotron} from 'react-bootstrap'

const NotFoundScreen = () => {
    return (
      <Container>
        <Jumbotron>
          <h1 className="display-4">404 - Page Not Found</h1>
          <p className="">
            Sorry, The page you are looking for might have been removed, had its
            name changed or is temporarily unavailable.
          </p>
          <hr className="my-4" />

          <p className="lead">
            <Link className="btn btn-secondary" to="/" role="button">
              Home
            </Link>
          </p>
        </Jumbotron>
        </Container>
    )
}

export default NotFoundScreen
