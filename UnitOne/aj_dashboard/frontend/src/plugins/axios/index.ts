import axios, {AxiosInstance} from 'axios'
import {EndpointType} from "../../types/HttpTypes";

const axiosInstance: AxiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000/',
    headers: {
        "Content-Type" : "application/json"
    }
});

export const http = <T>(endpoint: EndpointType, payload: {}): Promise<T> => {
    console.log('httpEnd' , endpoint)
    const url = endpoint.url.charAt(0) == '/' ? endpoint.url : 'api/' + endpoint.url;
    const method = endpoint.method;
    return axiosInstance[method]<T>(url, payload) as Promise<T>;
}

