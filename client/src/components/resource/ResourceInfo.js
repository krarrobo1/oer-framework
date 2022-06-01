import React, { useState, useEffect, useContext } from 'react'
import BlockchainContext from 'src/BlockchainContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { IPFSURL } from 'src/types/constants'

import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { VersionHistory } from './modals/VersionHistory';
import { UsageHistory } from './modals/UsageHistory';
import { Spinner } from 'src/components/misc/Spinner';
import { TraceabilityModal } from './modals/TraceabilityModal';
import { timeConverter } from 'src/helpers/timeConverter';
import { getResourceDescription } from 'src/helpers/ipfsFetch';



export const ResourceInfo = () => {
    let { id } = useParams();

    const { web3, accounts, resourceListContract } = useContext(BlockchainContext);
    const [description, setDescription] = useState(undefined);
    const [resource, setResource] = useState(undefined);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [show, setShow] = useState(false);

    const handleShow = (e) => {
        e.preventDefault();
        setShow(true)
    };

    useEffect(() => {
        try{
            if(resourceListContract){
               loadResource();
            }
        }catch(error){
            console.log("Error loading resource", error);
        }
    }, [resourceListContract])


    async function loadResource() {
        let resourceData = await resourceListContract.methods.resources(id).call({ from: accounts[0] });
        setResource(resourceData);
        let desc = await getResourceDescription(resourceData.descriptionhash);
        setDescription(desc);
        console.log({ desc });
        setLoading(false);
    }

  

    return (
        <Row className="mt-5">
            {!loading ? (<>
                <a href="/explore" className="mb-2">Go back to explorer</a>
                <Col sm={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                {description.title}
                            </Card.Title>
                            <Row>
                                <Col xs={12}>
                                    <a className="m-2 btn btn-outline-success" href={IPFSURL + description.fileHash} target="_blank">View Resource</a>
                                    <a className="m-2 btn btn-success" onClick={handleShow}>Download</a>
                                </Col>
                                <Col xs={12}>
                                    <Row>
                                        <Col>
                                            <VersionHistory
                                                web3={web3}
                                                filehash={description.fileHash}
                                                resourceListContract={resourceListContract} />
                                            <UsageHistory
                                                web3={web3}
                                                fileHash={description.fileHash}
                                                resourceListContract={resourceListContract} />
                                        </Col>
                                        <Col>
                                            <Link to={{ pathname: `/remix/${resource.descriptionhash}`, resourceData: description }}>
                                                Remix
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <TraceabilityModal
                                show={show}
                                setShow={setShow}
                                from={accounts[0]}
                                resourceListContract={resourceListContract} 
                                description={description}
                                />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} className="mt-5">
                    <Card >
                        <Card.Body>
                            <Card.Title>Description</Card.Title>
                            <hr />
                            <Row>
                                <Col xs={12}>
                                    <span className="font-weight-bold">Subject Area: </span> {description.subject}
                                </Col>
                                <Col xs={12}>
                                    <span className="font-weight-bold">Level: </span> {description.educationLevel}
                                </Col>
                                <Col xs={12}>
                                    <span className="font-weight-bold">Material Type: </span> {description.resourceType}
                                </Col>
                                <Col xs={12}>
                                    <span className="font-weight-bold">Author: </span> {description.author}
                                </Col>
                                <Col xs={12}>
                                    <span className="font-weight-bold">Date added: </span> {timeConverter(resource.timestamp)}
                                </Col>
                                <Col xs={12} className="mt-3">
                                    <span className="font-weight-bold">License: </span> {description.license.name}
                                </Col>
                                <Col xs={12}>
                                    <span className="font-weight-bold">Language </span> {description.language}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card >
                </Col>
            </>) : <Spinner loading={loading} />}
        </Row>
    )
}
