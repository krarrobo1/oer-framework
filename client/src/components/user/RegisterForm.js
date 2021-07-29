import React, { useContext } from 'react';
import BlockchainContext from '../../BlockchainContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';

export const RegisterForm = () => {
    const { web3, userListContract, accounts, setUser } = useContext(BlockchainContext);

    const [formState, handleInputChange] = useForm({
        name: ''
    });

   

    const { name } = formState;

    const handleRegister = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await registerUser();
        }
    }

    const registerUser = async () => {
        const userAddress = accounts[0];
        const hexName = web3.utils.utf8ToHex(name);
        try {
            await userListContract.methods.register(hexName).send({ from: userAddress });
            Swal.fire('User registered successfully');
            setUser(name);
        } catch (error) {
            console.log('REGISTER_ERR', error);
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            return false;
        }
        return true;
    }

    return (
        <>
            <div className="mt-5">
                <h3>Welcome</h3>
                <span>Please register to continue</span>
            </div>
            <div className="mt-5">
                <Form onSubmit={handleRegister}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleInputChange}
                            value={name} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </>
    )
}
