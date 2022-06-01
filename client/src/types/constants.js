const env = process.env.NODE_ENV;

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

const urls = {
  production:{
    siteUrl: "https://oerworld.web.app/",
    ipfsUrl: "https://gateway.ipfs.io/ipfs/"
  },
  development:{
    siteUrl: "http://localhost:3000",
    ipfsUrl: "http://localhost:8080/ipfs/"
  }
}


const IPFSURL = urls[env].ipfsUrl;
const SITEURL = urls[env].siteUrl;

export { NETWORKS, IPFSURL, SITEURL };