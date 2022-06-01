import { create } from 'ipfs-http-client';

const config = {
    production: {
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
    },
    development:{
        host: 'localhost',
        port: 5001,
        protocol: 'http',
    }
};

const ipfs = create(config[process.env.NODE_ENV]);

export default ipfs;