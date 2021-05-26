import React, { useState, useEffect } from 'react';
import { ResourceInfo } from '../components/resource/ResourceInfo';

export const Resource = (props) => {
    const { resource } = props.location;
    return (
        <div>
            <ResourceInfo resource={resource} />
        </div>
    )
}
