import ipfs from 'src/ipfs';


export async function getResourceDescription(path) {
    let result = ipfs.cat(path);
    let contents = "";
    for await (const item of result) {
        contents += new window.TextDecoder().decode(item);
    }
    contents = contents.replace(/\0/g, "");
    return JSON.parse(contents);
}