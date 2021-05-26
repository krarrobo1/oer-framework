import { licenses } from '../types/resource';

export const getLicense = (id)=>{
    return licenses[id].title;
}