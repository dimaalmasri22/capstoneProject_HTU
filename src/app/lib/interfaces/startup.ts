import {  Sectors } from "./sector";

export interface startup {
    id?:string,
    city?:string,
    companyName?:string,
    email?:string,
    founder?:string,
    logo?:string,
    numOfEmployees?:number,
    phone?:number,
    sector?:string[],
    website?:string,
    yearOfEstablishment?:number,
}