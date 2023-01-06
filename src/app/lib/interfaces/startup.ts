import {  Sectors } from "./sector";

export interface startup {
    id?:number
    city?:string,
    companyName?:string,
    email?:string,
    founder?:string,
    logo?:string,
    numOfEmployees?:number,
    phone?:number,
    sector?:Sectors,
    website?:string,
    yearOfEstablishment?:number,
}