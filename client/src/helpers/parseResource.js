import Web3 from "web3";
import { timeConverter } from "./timeConverter";
export const parseResource = (resource) =>{
    return {
        ...resource,
        title: Web3.utils.hexToUtf8(resource.title),
        author: Web3.utils.hexToUtf8(resource.author),
        timestamp: timeConverter(resource.timestamp),
    }
}