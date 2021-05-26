import React from 'react';
import { useForm } from '../../hooks/useForm';
import Form from 'react-bootstrap';

export const RemixForm = () => {
    const [formState, handleInputChange] = useForm({
        comment: ''
    })
    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Label>What additions or improves you added to this resource?</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        name="title"
                        maxLength="32"
                        placeholder="Enter the resource title"
                        onChange={handleInputChange}
                    />
                </Form.Group>
            </Form>
        </>
    )
}
