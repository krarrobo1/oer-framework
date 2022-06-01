import React from 'react';
import { usages } from 'src/types/resource';
import { Form, Col, Row } from 'react-bootstrap';
import { SelectInput } from './form/SelectInput';
import { Feedback } from './form/Feedback';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";

export const UsageForm = ({
    resourceListContract,
    from,
    fileHash
}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        if (resourceListContract){
            resourceListContract.methods.registerUsage(fileHash, parseInt(data.usage), data.comment).send({ from })
                .once('transactionHash', function (hash) {
                    Swal.fire("Resource Used", "You've registered a resource usage please wait for transaction confirmation...", "info")
                })
                .then(function (receipt) {
                    Swal.fire("Transaction Confirmed", `GAS USED: ${receipt.gasUsed}`, "success")
                })
                .catch(function (error) {
                    const { code, message } = error
                    Swal.fire("Transaction Rejected", `${code}: ${message}`, "error")
                })
                .finally(() => {
                    reset();
                });
        }
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} id='usage-form'>
            <Row>
                <Col xs={12}>
                    <SelectInput
                        register={
                            register("usage", { validate: val => val !== "Choose one..." })}
                        options={usages}
                        label={"What is this used for"}
                    />
                    <Feedback show={errors["usage"]} />
                </Col>
                <Col>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                        type="text-area"
                        name="comment"
                        placeholder="I'm using this resource for..."
                        {...register("comment", { required: false })}
                    />
                    <Feedback show={errors["comment"]} />
                </Col>
            </Row>
        </Form>
    )
}
