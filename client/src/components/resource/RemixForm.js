import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { SelectInput } from './form/SelectInput';
import { Feedback } from './form/Feedback';

import {
    adaptations
} from 'src/types/resource';


export const RemixForm = ({
    register,
    errors
}) => {
    return (
        <Row>
            <Col>
                <Form.Label>What additions or improves you added to this resource?</Form.Label>
                <Form.Control
                    type="text"
                    {...register("improvementComment", { required: true})}
                />
                <Feedback show={errors["improvementComment"]} />
            </Col>
            <Col>
                <SelectInput
                    register={
                        register("adaptation", { validate: val => val !== "Choose one..." })
                    }
                    options={adaptations.map((item, idx) => ({ id: idx, title: item}) )}
                    label={"Adaptation Type"}
                />
                <Feedback show={errors["adaptation"]} />
            </Col>
        </Row>
    )
}
