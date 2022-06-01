import React from 'react'
import Card from 'react-bootstrap/Card';

import { timeConverter } from 'src/helpers/timeConverter';
import { usages } from 'src/types/resource';

export const UsageItem = ({ log}) => {
    return (
        <>
            { !!log &&
                (<Card key={log.timestamp}>
                    <Card.Body>
                        <span  className="font-weight-bold">Date: </span> <p>{timeConverter(log.timestamp)} </p>
                        <span className="font-weight-bold"> User: </span> <p>{log.user}</p>
                        <span  className="font-weight-bold">Usage:</span> <p>{usages[log.usage].title}</p>
                       <span className="font-weight-bold"> Comment:</span> <p>{log.comment}</p>
                    </Card.Body>
                </Card>)
            }
        </>
    )
}
