import Endpoints from "../../utilities/endpoints";
import {EndpointsType, EndpointType} from "../../types/HttpTypes";

/**
 * get the route object according to the passed name
 * @param name
 * @author Amr
 */
export const getEndpoint = (name: string): EndpointType => {
    const _endpoints = {...Endpoints} as EndpointsType
    for (let key in _endpoints) {
        if (key == name?.trim())
            return _endpoints[key]
    }
    throw Error(`${name} does not exist`)
}

export const addParamsToEndpoint = (endpoint: EndpointType, params: any) => {
    for (let key in params) {
        endpoint.url = endpoint.url.replace(`:${key}`, params[key] as string)
    }
    return endpoint
}