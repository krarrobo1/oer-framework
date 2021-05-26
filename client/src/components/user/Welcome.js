import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

export const Welcome = (props) => {
    const { user } = props;
    return (
        <Row className="mt-5">
            <Col sm={12}>
                <h3>Welcome, {user}</h3>
                <hr />
            </Col>
            <Col>
                <Card.Img variant="top" src="./openlesson.png"/>
                <Card.Body>
                    <Card.Title>Share OER</Card.Title>
                    <Card.Text>
                        Submit OER from the web or upload a standalone learning module, lesson, assignment, assessment or activity.
                    </Card.Text>
                    <Button as={Link} to="/upload" variant="primary">Add OER</Button>
                </Card.Body>
            </Col>
            <Col>
                <Card.Img variant="top" src="./traceability.png" />
                <Card.Body>
                    <Card.Title>Explore OERS</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button as={Link} to="/explore" variant="primary">Find OERS</Button>
                </Card.Body>
            </Col>

        </Row>
    )
}
