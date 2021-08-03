import React, { useState, useEffect, useContext } from 'react'
import { licenses, licenseMap } from '../../types/resource';
import BlockchainContext from '../../BlockchainContext';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { IPFSURL } from '../../types/constants'

import { useParams } from "react-router";
import { getRdfDescription } from '../../helpers/getRdfDescription';
import { Link } from 'react-router-dom';
import { VersionHistory } from './modals/VersionHistory';
import { UsageHistory } from './modals/UsageHistory';
import { Spinner } from '../Spinner';
import { TraceabilityModal } from './modals/TraceabilityModal';
import { timeConverter } from '../../helpers/timeConverter';



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
        loadResource();
    }, [resourceListContract])


    const loadResource = async () => {
        try {
            let resourceData = await resourceListContract.methods.resources(id).call({ from: accounts[0] });
            let desc = await getRdfDescription(resourceData.descriptionhash);
            console.log(desc);
            setResource(resourceData);
            setDescription(desc);
            setLoading(false);
        } catch (err) {
            console.log("Error loading resource", err);
        }
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
                                    <a className="m-2 btn btn-outline-success" href={IPFSURL + description.filehash} target="_blank">View Resource</a>
                                    <a className="m-2 btn btn-success" onClick={handleShow}>Download</a>
                                </Col>
                                <Col xs={12}>
                                    <Row>
                                        <Col>
                                            <VersionHistory
                                                web3={web3}
                                                filehash={description.filehash}
                                                resourceListContract={resourceListContract} />
                                            <UsageHistory
                                                web3={web3}
                                                filehash={description.filehash}
                                                resourceListContract={resourceListContract} />
                                        </Col>
                                        <Col>
                                            <Link to={{ pathname: `/remix/${description.filehash}`, originalResource: description }}>
                                                Remix
                                            </Link>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <TraceabilityModal
                                show={show}
                                setShow={setShow}
                                filehash={description.filehash}
                                from={accounts[0]}
                                contract={resourceListContract} />
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
                                        <span className="font-weight-bold">Subject: </span> {description.subject}
                                    </Col>
                                    <Col xs={12}>
                                        <span className="font-weight-bold">Level: </span> {description.educationLevel}
                                    </Col>
                                    <Col xs={12}>
                                        <span className="font-weight-bold">Material Type: </span> {description.materialtype}
                                    </Col>
                                    <Col xs={12}>
                                        <span className="font-weight-bold">Author: </span> {description.author}
                                    </Col>
                                    <Col xs={12}>
                                        <span className="font-weight-bold">Date added: </span> {timeConverter(resource.timestamp)}
                                    </Col>
                                    <Col xs={12} className="mt-3">
                                        <span className="font-weight-bold">License: </span> {licenses[licenseMap.get(description.licenseAbbr).id].title}
                                        <a className="ml-2" rel="license" href={description.license}><img alt="Licencia Creative Commons" style={{ borderWidth: 0 }} src={ description.licenseAbbr != "publicdomain" ? `https://i.creativecommons.org/l/${description.licenseAbbr}/4.0/88x31.png` : `https://licensebuttons.net/l/publicdomain/88x31.png`} /></a>
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
