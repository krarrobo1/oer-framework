import React from 'react';
import Button from 'react-bootstrap/Button';
import { Form, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { Feedback } from 'src/components/resource/form/Feedback';


export const RegisterForm = ({
    web3,
    userListContract,
    accounts,
    setUser,
    setErrors,
}) => {


    const { register, formState: { errors }, handleSubmit, reset } = useForm();



    const onSubmit = async (data) => {
        const hexName = web3.utils.utf8ToHex(data.name);
        try {
            await userListContract.methods.register(hexName).send({ from: accounts[0] })
                .once('transactionHash', function (hash) {
                    Swal.fire("User Registered", "You've registered your account, please wait to the confirmation...", "info")
                })
                .then(function (receipt) {
                    Swal.fire("User Registered successfully", `Now you can continue using the App`, "success")
                    setUser(data.name);
                })
                .catch(function (error) {
                    const { code, message } = error
                    Swal.fire("Transaction Rejected", `${code}: ${message}`, "error")
                    setErrors("Couldn't register user!");

                })
                .finally(() => {
                    reset();
                });
        } catch (error) {
            setErrors("Couldn't register user!");
            console.log('User register error', error);
        }
    }


    return (
        <>
            <div className="mt-5">
                <h3>Welcome</h3>
                <span>Please register to continue</span>
            </div>
            <div className="mt-5">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="32"
                                placeholder="Enter your full name"
                                {...register("name", { required: true })}
                            />
                            <Feedback show={errors["name"]} />
                        </Col>
                    </Row>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </>
    )
}
