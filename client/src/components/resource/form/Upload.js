import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

import { convertToBuffer } from '@/helpers/fileToBuffer';


export const Upload = ({ file, setManual, setCanSubmit }) => {
    const [fileName, setFilename] = useState("...");
    const [fileUrl, setFileurl] = useState("");
    const [uploaded, setUploaded] = useState(false);

    useEffect(() => {
        if(file===""){
            setFilename("...");
            setUploaded(false);
            setFileurl("");
        }
    }, [file])

    const captureFile = (event) => {
        event.stopPropagation();
        event.preventDefault();

        const file = event.target.files[0];

        if (!!file) {
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = async () => {
                let file = await convertToBuffer(reader);
                setManual({ file });
            };
            setFilename(file.name);
            setUploaded(true);
            setCanSubmit(true);
        }
    }

    const handleInputChange = ({ target }) => {
        setFileurl(target.value);
        setCanSubmit(true);
        setManual({ file: target.value });
    }

    

    return (
        <>
            <Form.Group >
                <Form.Label>Resource Url</Form.Label>
                <Form.Control
                    type="text"
                    value={fileUrl}
                    name="file"
                    disabled={uploaded}
                    placeholder="Enter the resource url"
                    onChange={handleInputChange}
                />
            </Form.Group>
            <span className="mb-5">Upload a file</span>
            <Form.Group className="mt-3">
                <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input
                        isValid={uploaded}
                        onChange={captureFile}
                        disabled={fileUrl !=="" ? true: false}
                    />
                    <Form.File.Label data-browse="Upload">
                        {fileName}
                    </Form.File.Label>
                    <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
                </Form.File>
            </Form.Group>
        </>
    )
}
