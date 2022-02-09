import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useForm } from 'src/hooks/useForm';
import { IPFSURL } from 'src/types/constants';
import { UsageForm } from 'src/components/resource/UsageForm';



export const TraceabilityModal = ({ show, setShow, filehash, from, contract }) => {

    const [trace, setTrace] = useState(false);

    const [formState, handleInputChange] = useForm({
        comment: '',
        usage: ''
    });

    const { comment, usage } = formState;

    const handleSubmit = async (e) => {
        if (checkForm()) {
            e.preventDefault();
            let result = await contract.methods.registerUsage(filehash, usage, comment).send({ from });
            if (result) {
                Swal.fire("Log Added", "Thanks for your colaboration", "success");
                setShow(false);
                setTrace(false);
            }
        }
    }


    const handleClose = () => {
        setShow(false);
        setTrace(false);
    };

    const handleTrace = () => {
        setTrace(true);
    }

    const checkForm = () => {
        if (comment.length < 2) {
            return false;
        } else if (usage === "") {
            return false;
        }
        return true;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Traceability</Modal.Title>
            </Modal.Header>
            {!trace ?
                <Modal.Body>
                    <span>Would you like to contribute to traceability of this resource?</span>
                </Modal.Body>
                :
                <Modal.Body>
                    <UsageForm formState={formState} handleInputChange={handleInputChange} />
                </Modal.Body>
            }

            <Modal.Footer>
                {!trace ?
                    <>
                        <a
                            className="btn btn-secondary"
                            onClick={handleClose}
                            href={`${IPFSURL}${filehash}`}
                        >
                            Download
                        </a>
                        <Button
                            variant="primary"
                            onClick={handleTrace}>
                            Sure
                        </Button>
                    </> :
                    <>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={handleSubmit}
                        >
                            Submit and Download
                        </Button>
                    </>
                }
            </Modal.Footer>
        </Modal>
    )
}