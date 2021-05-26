import React from 'react'
import { timeConverter } from '../../../helpers/timeConverter';
export const TraceItem = ({ log, i }) => {
    return (
        <>
            { !!log && 
                (<li key={i + 1}>
                    <div className="d-inline">
                    <span  className="font-weight-bold">Remix published on {timeConverter(log.timestamp)}</span> <p>by {log.user}</p>
                    <a href={`http://localhost:3000/resource/${log.remix}`}>link</a>
                    </div>
                </li>)
            }
        </>
    )
}
