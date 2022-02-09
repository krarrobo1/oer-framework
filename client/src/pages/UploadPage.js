import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { UploadForm } from 'src/components/resource/UploadForm'

export const UploadScreen = () => {
    return (
        <Row className="mt-5 mb-5">
            <Col sm={12}>
                <h3>Upload form</h3>
                <hr />
            </Col>
            <Col>
                <UploadForm />
            </Col>
        </Row>
    )
}
