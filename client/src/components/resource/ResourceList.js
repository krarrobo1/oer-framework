import React from 'react';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import { getLicense } from 'src/helpers/getLicense';
import { Spinner } from 'src/components/misc/Spinner';



export const ResourceList = ({
    resourceList,
    isLoading
}) => {

    return (
        <Col>
            { !isLoading ?
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
                                            Link
                                        </Link>
                                    </td>
                                    <td key={row.timestamp}>{row.timestamp}</td>
                                    <td key={getLicense(row.license)}>{getLicense(row.license)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                )
                :
                <Spinner loading={isLoading} />
            }
        </Col>
    )
}
