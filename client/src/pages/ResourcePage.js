import React from 'react';
import { ResourceInfo } from 'src/components/resource/ResourceInfo';

export const Resource = (props) => {
    const { resource } = props.location;
    return (
        <div>
            <ResourceInfo resource={resource} />
        </div>
    )
}
