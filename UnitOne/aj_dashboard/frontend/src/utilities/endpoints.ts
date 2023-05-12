import {HttpMethodTypes} from "../types/Enums";

export default {
    login : {
        url : '/auth/token',
        method: HttpMethodTypes.POST
    },
    logout:{
        url : '/auth/token/logout',
        method: HttpMethodTypes.POST
    },
    add_user:{
        url : 'users/',
        method: HttpMethodTypes.POST
    },
    find_user : {
        url : 'users/:id',
        method: HttpMethodTypes.GET
    },
    update_user : {
        url : 'users/:id',
        method: HttpMethodTypes.POST
    }
}
