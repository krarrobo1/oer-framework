import React, { useContext, useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { ResourceList } from 'src/components/resource/ResourceList';
import BlockchainContext from 'src/BlockchainContext';
import { parseResource } from 'src/helpers/parseResource';



export const ResourceListScreen = () => {
    const { accounts, resourceListContract } = useContext(BlockchainContext);
    const [isLoading, setIsLoading] = useState(true);
    const [resourceList, setResourceList] = useState([]);

    useEffect(() => {
        if(resourceListContract){
            fetchResources();
        }
    }, []);

    const fetchResources = async () => {
        const resourceCount = await resourceListContract.methods.getResourcesCount().call({ from: accounts[0] });
        const table = await Promise.all(
            Array.from({
            length:  resourceCount
        }, async(_, i) => 
        {
            const key = await resourceListContract.methods.resourceIndex(i).call({ from: accounts[0]})
            return parseResource(await resourceListContract.methods.resources(key).call({ from: accounts[0] }))
        }));
        setResourceList(table);
        setIsLoading(false);
    }

    return (
        <Row className="mt-5">
            <Col sm={12}>
                <h3>Resources</h3>
                <hr />
            </Col>
            <ResourceList resourceList={resourceList} isLoading={isLoading}/>
        </Row>
    )
}
