import {HttpMethodTypes} from "./Enums";

interface EndpointType {
    url: string,
    method: HttpMethodTypes
}

interface EndpointsType {
    [key:string] : EndpointType
}

interface ResponseType<T> {
    code:number,
    message:string,
    payload:T,
    status:string
}

interface AuthResponseType extends ResponseType {
    refresh: string,
    token:string
}

