const ENV = process.env.NODE_ENV;

const NETWORKS = {
    '1': {
      name: 'Main Net',
      color: '#29B6AF'
    },
    '3': {
      name: 'Ropsten',
      color: '#FF4A8D'
    },
    '4': {
      name: 'Rinkeby',
      color: '#F6C343'
    },
    '42': {
      name: 'Kovan',
      color: '#7057ff'
    }
}


const IPFSURL = ENV === 'development' ? 'http://localhost:8080/ipfs/':'https://gateway.ipfs.io/ipfs/'
const SITEURL = ENV === 'development' ?  'http://localhost:3000/' : 'https://oerworld.web.app/' 
export { NETWORKS, IPFSURL, SITEURL };