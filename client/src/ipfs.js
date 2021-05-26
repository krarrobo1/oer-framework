import IPFS from 'ipfs-api';

const config = {
    host: 'localhost',
    port: 5001, 
    protocol: 'http'
};

const ipfs = new IPFS(config);

export default ipfs;