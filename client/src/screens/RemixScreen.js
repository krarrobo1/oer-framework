import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { UploadForm } from '../components/resource/UploadForm'

export const RemixScreen = (props) => {
    const{originalResource} = props.location;
    return (
        <Row className="mt-5 mb-5">
            <Col sm={12}>
                <h3>Remix form</h3>
                <hr />
            </Col>
            <Col>
                <UploadForm originalResource={originalResource} />
            </Col>
        </Row>
    )
}
