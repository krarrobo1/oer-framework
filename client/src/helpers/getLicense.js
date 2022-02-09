import { licenses } from 'src/types/resource';

export const getLicense = (id)=>{
    return licenses[id].title;
}