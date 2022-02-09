import Web3 from "web3";

function onSubmitResource(data){
    return {
        ipfsTitle : Web3.utils.utf8ToHex(title),
        ipfsAuthor : Web3.utils.utf8ToHex(author)
    }
}