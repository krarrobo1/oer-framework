import {
    ccLicenses,
    educationLevels,
    languages,
    resourceTypes,
    subjectAreas
} from 'src/types/resource';
import ipfs from 'src/ipfs';


function fileToBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.onerror = reject;
        reader.onloadend = function (ev) {
            resolve(Buffer.from(reader.result));
        }
        reader.readAsArrayBuffer(file);
    })
}

export async function uploadResourceFile(file) {
    const fileBuffer = await fileToBuffer(file);
    return await ipfs.add(fileBuffer);
}

export async function uploadResourcefromUrl(url) {
    const response = await fetch(url, {
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    });
    // FIXME: Needs further test
    const content = await response.arrayBuffer();
    return await ipfs.add(content)
}


export async function uploadResourceDescription(resource) {
    const resourceJson = JSON.stringify({
        ...resource,
        id: resource.fileHash,
        subject: subjectAreas[resource.subject],
        educationLevel: educationLevels[resource.educationLevel],
        resourceType: resourceTypes[resource.resourceType],
        language: languages[resource.language],
        license: {
            id: resource.license,
            name: ccLicenses[resource.license]
        },
    });
    return await ipfs.add(resourceJson);
}