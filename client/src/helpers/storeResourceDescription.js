import { SITEURL, IPFSURL } from 'src/types/constants';
import { licenses } from 'src/types/resource';

export function storeResourceDescription(resource) {
    const resourceJson = JSON.stringify({
        ...resource,
        url: `${SITEURL}resource/${resource.filehash}`,
        ipfsUrl: `${IPFSURL}${resource.filehash}`,
        license: `${licenses[`${resource.license}`].url}`,
    });

    return new Promise((resolve, reject) => {
        ipfs.add(Buffer.from(resourceJson, 'utf-8'), (err, data) => {
            if (err) {
                reject(err);
            }
            const { hash } = data[0];
            resolve(hash);
        })
    });
}