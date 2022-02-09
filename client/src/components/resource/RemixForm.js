import React from 'react';
import { useForm } from 'src/hooks/useForm';
import Form from 'react-bootstrap/Form';
import { UploadForm } from './UploadForm'
import {
    adaptations
} from 'src/types/resource';

import { useParams } from "react-router";

export const RemixForm = ({ originalResource }) => {
    const [formState, handleInputChange] = useForm({
        comment: '',
        adaptation: undefined
    });
    let { id } = useParams();
    const {comment, adaptation} = formState;
    return (
        <>
            <Form>
                <Form.Group >
                    <Form.Label>What additions or improves you added to this resource?</Form.Label>

                    <Form.Control
                        type="text"
                        value={comment}
                        name="comment"
                        maxLength="32"
                        placeholder="Specify the done changes or improvements..."
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group>
                        <Form.Label>Adaptation type</Form.Label>
                        <Form.Control
                            as="select"
                            name="adaptation"
                            onChange={handleInputChange}
                            value={adaptation}

                        >
                            <option>Choose one...</option>
                            {adaptations.map((a) => (<option
                                key={a.id}
                                value={a.id}
                            >
                                {a.title}
                            </option>))}
                        </Form.Control>
                    </Form.Group>
            </Form>
            <UploadForm originalResource={originalResource} adaptation={formState} originalhash={id} />
        </>
    )
}
