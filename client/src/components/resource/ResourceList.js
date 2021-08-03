import React, { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import BlockchainContext from '../../BlockchainContext';
import { getLicense } from '../../helpers/getLicense';
import { timeConverter } from '../../helpers/timeConverter';
import { Spinner } from '../Spinner';




export const ResourceList = () => {
    const { web3, accounts, resourceListContract } = useContext(BlockchainContext);
    const [loading, setLoading] = useState(true);
    const [resourceList, setResourceList] = useState([]);
    const [active, setActive] = useState(1);
    const [items, setItems] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);




    useEffect(() => {
        if (!!resourceListContract) {
            fetchResources();
        }
    }, []);


    const fetchResources = async () => {
        let table = [];
        let limit = 10 * (active);
        let offset = limit - 10;

        let resourceCount = await resourceListContract.methods.getResourcesCount().call({ from: accounts[0] });
        
        let pageNumber = Math.round(resourceCount / 10);
        if(pageNumber > 10){
            setPageNumber(pageNumber);
        }else{
            limit = resourceCount;
            offset = 0;
        }
        
        
        for (let i = offset; i < limit; i++) {
            const key = await resourceListContract.methods.resourceIndex(i).call({ from: accounts[0] });
            let resource = await resourceListContract.methods.resources(key).call({ from: accounts[0] });
            resource.title = web3.utils.hexToUtf8(resource.title);
            resource.author = web3.utils.hexToUtf8(resource.author);
            resource.timestamp = timeConverter(resource.timestamp);
            table.push(resource);
        }
        setResourceList(table);
        setLoading(false);
    }



    return (
        <Col>
            { !loading ?
                (<Table bordered hover>
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Description</th>
                            <th scope="col">Timestamp</th>
                            <th scope="col">License</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resourceList !== undefined &&
                            resourceList.map((row, idx) => (
                                <tr key={idx}>
                                    <td key={row.title}>{row.title}</td>
                                    <td key={row.author}>{row.author}</td>
                                    <td key={row.filehash}>
                                        <Link to={{ pathname: `/resource/${row.filehash}` }}>
                                            Explore
                                        </Link>
                                    </td>
                                    <td key={row.timestamp}>{row.timestamp}</td>
                                    <td key={getLicense(row.license)}>{getLicense(row.license)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                    {/* <Pagination>{items}</Pagination> */}
                    <br />
                </Table>
                )

                :
                <Spinner loading={loading} />
            }
        </Col>
    )
}
