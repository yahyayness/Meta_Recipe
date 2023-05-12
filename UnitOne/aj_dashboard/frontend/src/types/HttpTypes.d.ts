import {HttpMethodTypes} from "./Enums";

interface EndpointType {
    url: string,
    method: HttpMethodTypes
}

interface EndpointsType {
    [key:string] : EndpointType
}

interface ResponseType {}

interface AuthResponseType extends ResponseType {
    refresh: string,
    token:string
}