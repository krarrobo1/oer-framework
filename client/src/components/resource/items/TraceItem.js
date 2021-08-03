import React from 'react'
import { timeConverter } from '../../../helpers/timeConverter';
import Card from 'react-bootstrap/Card';

export const TraceItem = ({ log, i }) => {
    return (
        <>
            { !!log && 
                (<Card key={i + 1}>
                    <Card.Body className="d-inline">
                        <span  className="font-weight-bold">Remix published on {timeConverter(log.timestamp)}</span> <p>by {log.consumer}</p>
                        <a href={`http://localhost:3000/resource/${log.adaptedResource}`}>link</a>
                    </Card.Body>
                </Card>)
            }
        </>
    )
}
