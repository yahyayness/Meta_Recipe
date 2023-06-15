import axios, {AxiosInstance} from 'axios'
import {EndpointType, ResponseType} from "../../types/HttpTypes";
import {getEndpoint} from "../../common/http";
import {getLocalAttribute} from "../../common/helpers";
import {AlertTypes} from "../../types/Enums";
import {useAlert} from "../../common/hooks/alert";
import {useHttpLoader} from "../../common/hooks/httpLoader";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://165.227.132.182:8000/',
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
    if(response.data.status == 'error'){
        return  Promise.reject({
            response
        });
    }
    return response;
}, function (error) {
    // Do something with response error
    if (error.response.status === 401 && !dontBindToken.includes(error?.config.url ?? '')) {
        // Handle unauthorized access
        // Redirect user to login page
        window.location.href = '/auth/login'
    }
    return Promise.reject(error);
});

/**
 * the major function that connects front-end with the backend
 * @param endpoint
 * @param payload
 * @author Amr
 */
export const http = <T>(endpoint: EndpointType, payload: {} = {} , config:{}  = {}) => {
    const url = endpoint.url.charAt(0) == '/' ? endpoint.url : 'api/' + endpoint.url;
    const method = endpoint.method;
    return axiosInstance[method]<T>(url, payload,config);
}

/**
 * http custom hook
 * @author Amr
 */
export const useHttp = () => {
    const {showAlert} = useAlert();
    const {show} = useHttpLoader()
    /**
     * handle the request of http, so I can use the custom hooks in it
     * @param endpoint
     * @param payload
     * @author Amr
     */
    const request = <T>(endpoint: EndpointType, payload: {} = {} , config:{} = {}) => {
        // call the native http request that connects with backend
        const httpRequest = http<ResponseType<T>>(endpoint, payload,config)
        // show LinerProgressBar
        show(true)
        // listen to the request
        httpRequest.then((response) => {
            // hide LinerProgressBar
        }).catch(error => {
            showAlert({type: AlertTypes.ERROR, message: error.response.data.message})
        }).finally(()=>  show(false))
        return httpRequest;
    }

    return {request};
}

