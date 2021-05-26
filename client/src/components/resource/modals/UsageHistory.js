import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AiOutlineHistory } from 'react-icons/ai';
import { UsageItem } from '../items/UsageItem';

export const UsageHistory = ({ web3, filehash, contractAddress }) => {
    const [show, setShow] = useState(false);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        getUsageLogs();
    }, [filehash])

    const handleClose = () => {
        setShow(false);
    }
    const handleOpen = () => {
        setShow(true);
    }

    const getUsageLogs = async () => {
        let encodedHash = web3.utils.soliditySha3(filehash);
        let encodedEvent = web3.utils.soliditySha3("ResourceUsed(string,address,uint8,string,uint256)");
        let topics = [encodedEvent, encodedHash];
        let logs = await web3.eth.getPastLogs({
            address: contractAddress,
            fromBlock: 0,
            topics
        });
        for (let i = 0; i < logs.length; i++) {
            logs[i] = web3.eth.abi.decodeLog([
                {
                    type: 'string',
                    name: 'resource',
                    indexed: true
                },
                {
                    type: 'address',
                    name: 'user'
                },
                {
                    type: 'uint8',
                    name: 'usage'
                },
                {
                    type: 'string',
                    name: 'comment'
                },
                {
                    type: 'uint256',
                    name: 'timestamp'
                }
            ], logs[i].data, topics)
        }
        setLogs(logs);
    }

    return (
        <>
            <Button variant="success" onClick={handleOpen}> <AiOutlineHistory /> Usage History</Button>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Usage History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        logs.length > 0 ?
                            (<ul>
                                {logs.map((log, i) => (<UsageItem log={log} i={i} />))}
                            </ul>)
                            :
                            <Alert variant="secondary">
                                No logs available...
                            </Alert>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
