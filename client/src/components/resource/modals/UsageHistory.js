import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AiOutlineHistory } from 'react-icons/ai';
import { UsageItem } from 'src/components/resource/items/UsageItem';
import { usageLogSignature } from 'src/types/resource';

export const UsageHistory = ({
    web3,
    fileHash,
    resourceListContract
}) => {
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        if (resourceListContract) {
            getUsageLogs();
        }
    }, [resourceListContract])

    async function getUsageLogs() {
        let encodedHash = web3.utils.soliditySha3(fileHash);
        let encodedEvent = web3.utils.soliditySha3("ResourceUsed(string,address,uint8,string,uint256)");
        let topics = [encodedEvent, encodedHash];
        let rawLogs = await web3.eth.getPastLogs({
            address: resourceListContract.address,
            fromBlock: 0,
            topics
        });
        const logs = rawLogs.map((log) => web3.eth.abi.decodeLog(usageLogSignature, log.data, topics));
        setLogs(logs);
    }

    return (
        <>
            <Button variant="success" onClick={() => setShow(true)}> <AiOutlineHistory /> Usage History</Button>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Usage History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        logs.length > 0 ?
                            logs.map((log, i) => (<UsageItem log={log} i={i} />))
                            :
                            <Alert variant="secondary">
                                No logs registered..
                            </Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
