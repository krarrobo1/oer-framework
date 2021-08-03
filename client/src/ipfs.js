import IPFS from 'ipfs-api';

const config = {
    host: 'ipfs.infura.io',
    port: 5001, 
    protocol: 'https',
};

const ipfs = new IPFS(config);

export default ipfs;