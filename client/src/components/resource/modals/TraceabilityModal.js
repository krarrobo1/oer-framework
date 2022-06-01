import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { IPFSURL } from 'src/types/constants';
import { UsageForm } from 'src/components/resource/UsageForm';



export const TraceabilityModal = ({
    show,
    setShow,
    from,
    resourceListContract,
    description
}) => {

    const [confirmation, setConfirmation] = useState(false);



    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton onHide={() => setShow(false)}>
                <Modal.Title>Usage Traceability</Modal.Title>
            </Modal.Header>
            {!confirmation ?
                <Modal.Body>
                    <span>Would you like to contribute to usage traceability of this resource?</span>
                </Modal.Body>
                :
                <Modal.Body>
                    <UsageForm resourceListContract={resourceListContract} from={from} fileHash={description.fileHash} />
                </Modal.Body>
            }

            <Modal.Footer>
                {!confirmation ?
                    <>
                        <a
                            className="btn btn-secondary"
                            onClick={() => { setShow(false) }}
                            href={IPFSURL + description.fileHash}
                        >
                            Download
                        </a>
                       
                        <Button
                            variant="primary"
                            onClick={() => { setConfirmation(true) }}>
                            Sure
                        </Button>
                    </> :
                    <>
                        <Button variant="secondary" onClick={() => { setShow(false) }}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            form="usage-form"
                            variant="primary"
                        >
                            Submit and Download
                        </Button>
                    </>
                }
            </Modal.Footer>
        </Modal>
    )
}