import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ResourceList } from 'src/components/resource/ResourceList';



export const ResourceListScreen = () => {
    return (
        <Row className="mt-5">
            <Col sm={12}>
                <h3>Resources</h3>
                <hr />
            </Col>
            <ResourceList />
        </Row>
    )
}
