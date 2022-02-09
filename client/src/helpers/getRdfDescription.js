import xml2js from 'xml2js';
import ipfs from 'src/ipfs';

// gets rdf description from ipfs then parse it to js
export const getRdfDescription = async (hash) => {
    let parser = new xml2js.Parser();
    let [{ content }] = await ipfs.get(hash);
    let rdfDesc = Buffer.from(content).toString();

    return new Promise((resolve, reject) => {
        parser.parseString(rdfDesc, (err, result) => {
            if (err) reject(err);
            resolve(rdfToDescriptionObj(result));
        })
    });
}


const rdfToDescriptionObj = (desc) => {
    let rdfDescription = desc['rdf:RDF']['rdf:Description'][0];
    let splitedUrl = rdfDescription['schema:url'][0].split('/');
    let filehash = splitedUrl[splitedUrl.length - 1].replace('"', "");

    let splitedLicense = rdfDescription['xhtml:license'][0]['$']['rdf:resource'].split("/");
    let licenseAbbr = splitedLicense[splitedLicense.length - 4];

    let descriptionObj = {
        license: rdfDescription['xhtml:license'][0]['$']['rdf:resource'],
        licenseAbbr,
        url: rdfDescription['schema:url'][0],
        title: rdfDescription['schema:name'][0],
        subject: rdfDescription['schema:about'][0],
        educationLevel: rdfDescription['schema:educationalLevel'][0],
        materialtype: rdfDescription['schema:learningResourceType'][0],
        author: rdfDescription['schema:author'][0]["schema:Person"][0]["schema:name"][0],
        publisher: rdfDescription['schema:publisher'][0]["schema:Person"][0]["schema:name"][0],
        keywords: rdfDescription['schema:keywords'][0],
        language: rdfDescription['schema:inLanguage'][0],
        filehash
    }
    return descriptionObj;
}