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
                    <Card.Title>Share a Resource</Card.Title>
                    <Card.Text>
                        Submit OER from the web or upload a standalone learning module, lesson, assignment, assessment or activity.
                    </Card.Text>
                    <Button as={Link} to="/upload" variant="primary">Register</Button>
                </Card.Body>
            </Col>
            <Col>
                <Card.Img variant="top" src="./traceability.png" />
                <Card.Body>
                    <Card.Title>Find OERS</Card.Title>
                    <Card.Text>
                        Explore the stored OERs and it's traceability
                    </Card.Text>
                    <Button as={Link} to="/explore" variant="primary">Go to explorer</Button>
                </Card.Body>
            </Col>

        </Row>
    )
}
