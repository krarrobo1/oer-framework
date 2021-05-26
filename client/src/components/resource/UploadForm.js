import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2';
import validator from 'validator';
import BlockchainContext from '../../BlockchainContext';
import { useForm } from '../../hooks/useForm';
import {
    educationLevels, languages, licenses,
    materialTypes,
    subjectAreas,
    licenseMap
} from '../../types/resource';
import { Keywords } from './form/Keywords';
import { Link } from 'react-router-dom';
import { Upload } from './form/Upload';
import { getRdfDescription } from '../../helpers/rdfParser';



export const UploadForm = ({ originalResource }) => {
    const { web3, ipfs, accounts, resourceListContract, user } = useContext(BlockchainContext);
    const [licenseId, changeLicenseId] = useState(0)

    useEffect(() => {
        if (!!originalResource) {
            changeLicenseId(licenseMap.get(originalResource.licenseAbbr).id);
        }
    }, [])
    const [formState, handleInputChange, reset, setManual] = useForm({
        title: !!originalResource ? originalResource.title : "",
        author: !!originalResource ? originalResource.author : "",
        subject: !!originalResource ? originalResource.subject : "",
        educationLevel: !!originalResource ? originalResource.educationLevel : "",
        materialType: !!originalResource ? originalResource.materialtype : "",
        language: !!originalResource ? originalResource.language : "",
        license: !!originalResource ? licenseId : "",
        file: '',
        keywords: !!originalResource ? originalResource.keywords.split(',') : [],
        remixOf: !!originalResource ? originalResource.filehash : "",
        publisher: user,
        remixComment: ''
    });

    const { title, author, subject, educationLevel, materialType, language, license, keywords, file, remixOf, remixComment } = formState;

    const [canSubmit, setCanSubmit] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            const ipfsTitle = web3.utils.utf8ToHex(title);
            try {

                await ipfs.add(file, async (err, data) => {
                    const { hash } = data[0];
                    const ipfsHash = hash;
                   
                    const ipfsDescription = await getRdfDescription({ ...formState, filehash: hash });

                    try {
                        await resourceListContract.methods.addResource(
                            ipfsTitle,
                            ipfsHash,
                            ipfsDescription,
                            license,
                            remixOf,
                            remixComment
                        ).send({
                            from: accounts[0]
                        })
                        Swal.fire("Resource Added", "You've uploaded a new resource", "success")
                    } catch (error) {
                        console.log(error);
                    }

                });
                reset();
            } catch (error) {
                console.log('Upload Err', { error });
            }
        }
    }


    const isFormValid = () => {
        if (validator.isEmpty(title)) {
            return false;
        }
        else if (validator.isEmpty(author)) {
            return false;
        }
        else if (subject === "") {
            return false;
        }
        else if (materialType === "") {
            return false;
        }
        else if (educationLevel === "") {
            return false;
        }
        else if (license === "") {
            return false;
        }
        else if (language === "") {
            return false;
        }
        else if (keywords.length === 0) {
            return false;
        }
        return true;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Group >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            name="title"
                            maxLength="32"
                            placeholder="Enter the resource title"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            maxLength="32"
                            value={author}
                            placeholder="Enter the author name"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Label>Subject Area</Form.Label>
                        <Form.Control
                            as="select"
                            name="subject"
                            onChange={handleInputChange}
                            value={subject}

                        >
                            <option>Choose one...</option>
                            {subjectAreas.map((area) => (<option
                                key={area}
                                value={area}
                            >
                                {area}
                            </option>))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Education Level</Form.Label>
                        <Form.Control
                            as="select"
                            name="educationLevel"
                            onChange={handleInputChange}
                            value={educationLevel}

                        >
                            <option>Choose one...</option>
                            {educationLevels.map((el) => (
                                <option
                                    key={el}
                                    value={el}>
                                    {el}
                                </option>))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Material Type</Form.Label>
                        <Form.Control
                            as="select"
                            name="materialType"
                            value={materialType}
                            onChange={handleInputChange}
                        >
                            <option>Choose one...</option>
                            {materialTypes.map((mt) => (<option key={mt}>{mt}</option>))}
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group>
                <Form.Label>Language</Form.Label>
                <Form.Control
                    as="select"
                    name="language"
                    value={language}
                    onChange={handleInputChange}
                >
                    <option>Choose one...</option>
                    {languages.map((lan) => (<option key={lan}>{lan}</option>))}
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>License</Form.Label>
                <Form.Control
                    as="select"
                    name="license"
                    value={license}
                    onChange={handleInputChange}
                >
                    <option>Choose one...</option>
                    {licenses.map((lic) => (<option key={lic.id} value={lic.id}>{lic.title}</option>))}
                </Form.Control>
            </Form.Group>
            <Keywords keywords={keywords} setManual={setManual} />

            <Upload file={file} setManual={setManual} setCanSubmit={setCanSubmit} />



            <Button as={Link} to="/" className="m-2" variant="outline-primary">Cancel</Button>

            <Button className="m-2" type="submit" disabled={!canSubmit}>Submit</Button>

        </Form>
    )
}
