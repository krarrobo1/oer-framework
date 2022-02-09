import React from 'react';
import { usages } from 'src/types/resource';
import Form from 'react-bootstrap/Form';

export const UsageForm = ({ formState, handleInputChange }) => {
    const { comment, usage } = formState;
    return (
        <Form>
            <Form.Group>
                <Form.Label>Choose your usage</Form.Label>
                <Form.Control
                    as="select"
                    name="usage"
                    onChange={handleInputChange}
                    value={usage}
                >
                    <option>Choose one...</option>
                    {usages.map((usage) =>
                    (<option
                        key={usage.id}
                        value={usage.id}
                    >
                        {usage.title}
                    </option>)
                    )}
                </Form.Control>
            </Form.Group>
            <Form.Group >
                <Form.Label>Leave us a comment, what will you use the resource for?</Form.Label>
                <Form.Control
                    type="text-area"
                    value={comment}
                    name="comment"
                    placeholder="I'm using this resource for..."
                    onChange={handleInputChange}
                />
            </Form.Group>
        </Form>
    )
}
