import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Message } from 'src/components/misc/Message'
import { UploadForm } from 'src/components/resource/UploadForm'

export const UploadScreen = () => {
    const [error, setError] = useState(undefined);
    return (
        <Row className="mt-5 mb-5">
            <Col>
                {
                    error &&
                    <Message text={error} variant="danger" />
                }
            </Col>
            <Col xs={12}>
                <h3>Register a new resource</h3>
                <hr />
            </Col>
            <Col>
                <UploadForm setError={setError} />
            </Col>
        </Row>
    )
}
