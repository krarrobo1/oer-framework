import { SITEURL, IPFSURL } from '../types/constants';
import { licenses } from '../types/resource';
import ipfs from '../ipfs';



export const getRdfDescription = (resource) => {
    let rdfTemplate =
    `
<?xml version="1.0" encoding="utf-8" ?>
        <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:xhtml="http://www.w3.org/1999/xhtml#"
         xmlns:schema="http://schema.org/"
         xmlns:cc="http://creativecommons.org/ns#">

        <rdf:Description rdf:about="${SITEURL}resource/${resource.filehash}">
            <rdf:type rdf:resource="https://schema.org/LearningResource" />
            <xhtml:license rdf:resource="${licenses[`${resource.license}`].url}" />
            <cc:attributionName>${resource.author}</cc:attributionName>
            <schema:url>"${IPFSURL}${resource.filehash}"</schema:url>
            <schema:name>${resource.title}</schema:name>
            <schema:about>${resource.subject}</schema:about>
            <schema:learningResourceType>${resource.materialType}</schema:learningResourceType>
            <schema:educationalLevel>${resource.educationLevel}</schema:educationalLevel>
            <schema:author>
                <schema:Person>
                    <rdf:type rdf:resource="https://schema.org/Person" />
                    <schema:name>${resource.author}</schema:name>
                </schema:Person>
            </schema:author>
            <schema:publisher>
                <schema:Person>
                    <rdf:type rdf:resource="https://schema.org/Person" />
                    <schema:name>${resource.publisher}</schema:name>
                </schema:Person>
            </schema:publisher>
            <schema:keywords>${resource.keywords.join(',')}</schema:keywords>
            <schema:inLanguage>${resource.language}</schema:inLanguage>
            ${resource.remixOf !=="" ?  
            `<schema:isBasedOn>${SITEURL}resources${resource.remixOf}</schema:isBasedOn>
            </rdf:Description>
        </rdf:RDF>`:
            `
        </rdf:Description>
    </rdf:RDF>
            `
           }
        `;

        return new Promise((resolve, reject) => {
            ipfs.add(Buffer.from(rdfTemplate, 'utf-8'), (err, data) => {
                if (err) {
                    reject(err);
                }
                const { hash } = data[0];
                resolve(hash);
            })
    });
}