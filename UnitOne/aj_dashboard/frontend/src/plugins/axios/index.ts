import axios, {AxiosInstance} from 'axios'
import {EndpointType} from "../../types/HttpTypes";
import {useEffect} from "react";
import {getEndpoint} from "../../common/http";
import {getLocalAttribute} from "../../common/helpers";
import {useNavigator} from "../../common/routes";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        "Content-Type": "application/json"
    }
});

const dontBindToken = [getEndpoint('login').url]

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    if (!dontBindToken.includes(config?.url ?? '')) {
        const token = getLocalAttribute('aj_tokens', true)?.access
        // Do something before request is sent
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 401 && !dontBindToken.includes( error?.config.url ?? '')) {
        const {navigator} = useNavigator();
        // Handle unauthorized access
        // Redirect user to login page
        navigator('/auth/login');
    }
    return Promise.reject(error);
});

export const http = <T>(endpoint: EndpointType, payload: {}) => {
    console.log('httpEnd', endpoint)
    const url = endpoint.url.charAt(0) == '/' ? endpoint.url : 'api/' + endpoint.url;
    const method = endpoint.method;
    return axiosInstance[method]<T>(url, payload);
}

