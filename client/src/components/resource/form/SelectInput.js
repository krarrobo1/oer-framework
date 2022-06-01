import React from 'react';
import { Form } from 'react-bootstrap';

export const SelectInput = ({
    register,
    options,
    label,
}) => {

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                as="select"
                {...register}
            >
                <option>Choose one...</option>
               
                {options.map(opt =>(<option key={opt.id} value={opt.id}>{opt.title}</option>))}
            </Form.Control>
        </>
    )
};
