import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Col,
    Form,
    Row
} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import BlockchainContext from 'src/BlockchainContext';
import { uploadResourceDescription, uploadResourceFile, uploadResourcefromUrl } from 'src/helpers/ipfsUpload';
import { encodeResourceData, encodeAdaptationData } from 'src/helpers/encoder';
import {
    ccLicenses,
    educationLevels,
    languages,
    resourceTypes,
    subjectAreas,
    urlRegex,
} from 'src/types/resource';
import { Feedback } from './form/Feedback';
import { Keywords } from './form/Keywords';
import { SelectInput } from './form/SelectInput';
import Swal from 'sweetalert2';
import { RemixForm } from './RemixForm';

export const UploadForm = ({
    resourceData,
    setError
}) => {

    const {
        accounts,
        resourceListContract
    } = useContext(BlockchainContext)

    const {
        register,
        watch,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            ...resourceData
        }
    });

    const [resource, setResource] = useState("file");
    const [url, file] = watch(['url', 'file']);

  
    useEffect(() => {
      if(file && file.length > 0){
        setResource("file");
      }else if(url && url !== ""){
        setResource("url");
      }
    }, [url, file])


    async function addResource (data){
        if(resource === "file"){
            return await uploadResourceFile(data.file[0]);
        }else{
           return  await uploadResourcefromUrl(data.url);
        }
    }
    
    const onSubmit = async (data) => {
        try {
            const uploadedResource = await addResource(data);
            const descriptionUpload = await uploadResourceDescription({
                ...data,
                fileHash: uploadedResource.path
            });
            if(!resourceData){
                const encodedData = encodeResourceData({
                    title: data.title,
                    author: data.author,
                    fileHash: uploadedResource.path,
                    descriptionHash: descriptionUpload.path,
                    license: data.license
                });
                resourceListContract.methods.addResource(...encodedData).send({
                    from: accounts[0]
                })
                .once('transactionHash', function (hash) {
                    Swal.fire("Resource Added", "You've uploaded a new resource please wait for transaction confirmation...", "info")
                })
                .then(function (receipt) {
                    Swal.fire("Transaction Confirmed", `GAS USED: ${receipt.gasUsed}`, "success")
                })
                .catch(function (error) {
                    const { code, message } = error
                    Swal.fire("Transaction Rejected", `${code}: ${message}`, "error")
                })
                .finally(() =>{
                    reset();
                });
            }else{
                const encodedData = encodeAdaptationData({
                    title: data.title,
                    author: data.author,
                    fileHash: uploadedResource.path,
                    descriptionHash: descriptionUpload.path,
                    license: data.license,
                    adaptation: data.adaptation,
                    remixOf: resourceData.fileHash,
                    comment: data.improvementComment
                });

                resourceListContract.methods.addAdaptation(...encodedData).send({
                    from: accounts[0]
                })
                .once('transactionHash', function (hash) {
                    Swal.fire("Resource Added", "You've uploaded a new resource please wait for transaction confirmation...", "info")
                })
                .then(function (receipt) {
                    Swal.fire("Transaction Confirmed", `GAS USED: ${receipt.gasUsed}`, "success")
                })
                .catch(function (error) {
                    const { code, message } = error
                    Swal.fire("Transaction Rejected", `${code}: ${message}`, "error")
                })
                .finally(() =>{
                    reset();
                });
            }
        } catch (error) {
            console.log(error);
            setError("Couldn't register REA... ");
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            {
                resourceData &&
                <RemixForm register={register} errors={errors} />
            }
            <Row>
                <Col>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        placeholder="Enter the resource title"
                        {...register("title", { required: true })}
                    />
                    <Feedback show={errors["title"]} />
                </Col>
                <Col>
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        maxLength="32"
                        placeholder="Enter the author name"
                        {...register("author", { required: true })}
                    />
                    <Feedback show={errors["author"]} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SelectInput
                        register={
                            register("subject", { validate: val => val !== "Choose one..." })
                        }
                        options={subjectAreas.map((item, idx) => ({ id: idx, title: item}) )}
                        label={"Subject Area"}
                    />
                    <Feedback show={errors["subject"]} />
                </Col>
                <Col>
                    <SelectInput
                        register={
                            register("educationLevel", { validate: val => val !== "Choose one..." })}
                        options={educationLevels.map((item, idx) => ({ id: idx, title: item}) )}
                        label={"Education Level"}
                    />
                    <Feedback show={errors["educationLevel"]} />
                </Col>
                <Col>
                    <SelectInput
                        register={
                            register("resourceType", { validate: val => val !== "Choose one..." })}
                        options={resourceTypes.map((item, idx) => ({ id: idx, title: item}) )}
                        label={"Resource Type"}
                    />
                    <Feedback show={errors["resourceType"]} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SelectInput
                        register={
                            register("language", { validate: val => val !== "Choose one..." })}
                        options={languages.map((item, idx) => ({ id: idx, title: item}) )}
                        label={"Language"}
                    />
                    <Feedback show={errors["language"]} />
                </Col>
                <Col>
                    <SelectInput
                        register={
                            register("license", { validate: val => val !== "Choose one..." })}
                        options={ccLicenses.map((item, idx) => ({ id: idx, title: item}) )}
                        label={"Licenses"}
                    />
                    <Feedback show={errors["license"]} />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <Keywords control={control} />
                    <Feedback show={errors["keywords"]} />
                </Col>
                <Col xs={12}>
                    <Form.Label>Resource Url</Form.Label>
                    <Form.Control
                        placeholder="Enter the resource url"
                        {...register("url", { required: resource === "url", pattern: urlRegex })}
                        disabled={file && file.length > 0}
                    />
                    <Feedback show={errors["url"]} />
                </Col>
                <Col>
                    <Form.Label>Upload a file</Form.Label>
                    <Form.Control
                        type="file"
                        {...register("file", { required: resource === "file" })}
                        disabled={url && url !== ""}
                    />
                    <Feedback show={errors["file"]} />
                </Col>
                <Col xs={12}>
                    <Button as={Link} to="/" className="m-2" variant="outline-primary">Cancel</Button>
                    <Button className="m-2" type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    )
};
