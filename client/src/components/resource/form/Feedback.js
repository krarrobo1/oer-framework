import React from 'react';

export const Feedback = ({
    show
}) => {
    return (
        <p className="text-danger">
            {show && `${show.type ==="required" ? "Required*" : "Invalid input*"}`}
        </p>)
};
