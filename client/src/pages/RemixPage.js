import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { RemixForm } from 'src/components/resource/RemixForm';

export const RemixScreen = (props) => {
    const{originalResource} = props.location;
    return (
        <Row className="mt-5 mb-5">
            <Col sm={12}>
                <h3>Remix form</h3>
                <hr />
            </Col>
            <Col sm={12}>
                <RemixForm originalResource={originalResource}> </RemixForm>
            </Col>
            <Col>
                
            </Col>
        </Row>
    )
}
