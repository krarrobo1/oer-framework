import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AiOutlineHistory } from 'react-icons/ai';
import { TraceItem } from '../items/TraceItem';

export const VersionHistory = ({ web3, filehash, contractAddress }) => {
    const [show, setShow] = useState(false)
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const encodedHash = web3.utils.soliditySha3(filehash);
        // getResourceAddedLog(encodedHash);
        getVersionHistoryLogs(encodedHash);
    }, [filehash])

    const handleClose = () => {
        setShow(false);
    }
    const handleOpen = () => {
        setShow(true);
    }

    // const getResourceAddedLog = async (encodedHash) => {
    //     const encodedEvent = web3.utils.soliditySha3("ResourceAdded(address,string,uint256)");
    //     let topics = [encodedEvent, encodedHash];
    //     let logs = await web3.eth.getPastLogs({
    //         address: contractAddress,
    //         fromBlock: 0,
    //         topics
    //     });
    //     if(logs.length > 0){
    //         // let log = logs[0];
    //         console.log(logs);
    //         // web3.eth.abi.decodeLog([
    //         //     {
    //         //         type: 'address',
    //         //         name: 'publisher',
    //         //         indexed: true
    //         //     },
    //         //     {
    //         //         type: 'string',
    //         //         name: 'filehash',
    //         //         indexed: true
    //         //     },
    //         //     {
    //         //         type: 'uint256',
    //         //         name: 'timestamp',
    //         //         indexed: false
    //         //     }
    //         // ], log.data, topics);
    //         // setLogs([log, ...logs]);
    //     }
    // }

    const getVersionHistoryLogs = async (encodedHash) => {
        const encodedEvent = web3.utils.soliditySha3("ResourceAdapted(string,address,string,string,uint256)");
        let topics = [encodedEvent, encodedHash];
        let tempLogs = await web3.eth.getPastLogs({
            address: contractAddress,
            fromBlock: 0,
            topics
        });
        for (let i = 0; i < tempLogs.length; i++) {
            tempLogs[i] = web3.eth.abi.decodeLog([
                {
                    type: 'string',
                    name: 'resource',
                    indexed: true
                },
                {
                    type: 'address',
                    name: 'user',
                },
                {
                    type: 'string',
                    name: 'remix'
                },
                {
                    type: 'string',
                    name: 'comment'
                },
                {
                    type: 'uint256',
                    name: 'timestamp'
                }
            ], tempLogs[i].data, topics)

        }
        setLogs(tempLogs);
    }

    return (
        <>
            <Button variant="outline-success" onClick={handleOpen} className="m-2"> <AiOutlineHistory /> Version History</Button>
            <Modal show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Version History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        logs.length > 0 ?
                            (<ul>
                                {logs.map((log, i) => (
                                    <TraceItem key={log.timestamp} log={log} i={i} />
                                ))}
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