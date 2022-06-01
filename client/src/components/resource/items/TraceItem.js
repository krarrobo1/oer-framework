import React from 'react'
import { timeConverter } from 'src/helpers/timeConverter';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
export const TraceItem = ({ log, i }) => {
    return (
        <>
            { !!log && 
                (<Card key={i + 1}>
                    <Card.Body className="d-inline">
                        <span  className="font-weight-bold">Remix published on {timeConverter(log.timestamp)}</span> <p>by {log.consumer}</p>
                        <Link to={{ pathname: `/resource/${log.adaptedResource}` }}>
                            Explore
                        </Link>
                    </Card.Body>
                </Card>)
            }
        </>
    )
}
