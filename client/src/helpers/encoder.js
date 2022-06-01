import Web3 from "web3";

export function encodeResourceData(data){
    return [
        Web3.utils.utf8ToHex(data.title),
        Web3.utils.utf8ToHex(data.author),
        data.fileHash,
        data.descriptionHash,
        parseInt(data.license)
    ]
}

export function encodeAdaptationData(data){
    return [
        Web3.utils.utf8ToHex(data.title),
        Web3.utils.utf8ToHex(data.author),
        data.fileHash,
        data.descriptionHash,
        parseInt(data.license),
        parseInt(data.adaptation),
        data.remixOf,
        data.comment
    ]
}