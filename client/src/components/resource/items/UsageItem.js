import React from 'react'
import { timeConverter } from '../../../helpers/timeConverter';
import { usages } from '../../../types/resource';

export const UsageItem = ({ log, i }) => {
    return (
        <>
            { !!log &&
                (<li key={i + 1}>
                    <div className="d-inline">
                        <span  className="font-weight-bold">Used on </span> <p>{timeConverter(log.timestamp)} </p>
                        <span className="font-weight-bold"> by: </span> <p>{log.user}</p>
                        <span  className="font-weight-bold">Usage:</span> <p>{usages[log.usage].title}</p>
                       <span className="font-weight-bold"> Comment:</span> <p>{log.comment}</p>
                    </div>
                </li>)
            }
        </>
    )
}
