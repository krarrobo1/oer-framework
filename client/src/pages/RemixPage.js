import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { UploadForm } from 'src/components/resource/UploadForm';
import { getResourceDescription } from 'src/helpers/ipfsFetch';
import { Message } from 'src/components/misc/Message';

export const RemixScreen = ({
    location
}) => {

    const [error, setError] = useState(undefined);
    const [resourceData, setResourceData] = useState(undefined);

    useEffect(() => {
        async function fetchData() {
            const fullPath = location.pathname.split('/');
            const fileHash = fullPath[fullPath.length - 1];
            const resourceDescription = await getResourceDescription(fileHash);
            setResourceData(resourceDescription);
        }

        try {
            if (!location.resourceData) {
                fetchData();
            } else {
                setResourceData(location.resourceData);
            }
        } catch (error) {
            setError(error);
        }
    }, [location])




    return (
        <Row className="mt-5 mb-5">
            <Col>
                {
                    error &&
                    <Message text={error} variant="danger" />
                }
            </Col>
            <Col xs={12}>
                <h3>Remix form</h3>
                <hr />
            </Col>
            <Col>
                {resourceData && <UploadForm resourceData={resourceData} setError={setError} />}
            </Col>
        </Row>
    )
}
