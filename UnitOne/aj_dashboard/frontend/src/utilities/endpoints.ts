import {HttpMethodTypes} from "../types/Enums";

export default {
    login : {
        url : '/auth/token',
        method: HttpMethodTypes.POST
    }
}
