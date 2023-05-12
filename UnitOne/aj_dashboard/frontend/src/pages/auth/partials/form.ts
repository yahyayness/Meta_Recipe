import * as yup from "yup";
import * as React from "react";
import {useState} from "react";
import {useNavigator} from "../../../common/routes";
import {http} from "../../../plugins/axios";
import {getEndpoint} from "../../../common/http";
import {setLocalAttribute} from "../../../common/helpers";
import {useForm} from "../../../common/hooks/form";

export const form = (): Array<FormFields> => [

    {
        field: 'username',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('Username is required'),
        }
    },

    {
        field: 'password',
        value: '',
        validation: {
            rules: yup
                .string()
                // .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required'),
        }
    },

]
/**
 * submit login form and get tokens
 * @param REDIRECT_LINK
 * @author Amr
 */
export const useOnSubmitLoginForm = (toLink:string ) => {
    const [validationMessage, setValidationMessage] = useState<string>('')
    /**
     * common hook that controls all navigations
     * @author Amr
     */
    const {navigator} = useNavigator();
    /**
     * submit form
     * @param values
     */
    const onSubmit = (values: any) => {
        setValidationMessage('');
        http<AuthType>(getEndpoint('login'), values).then((response) => {
            const tokens = response?.data
            //save tokens inside the localStorage
            setLocalAttribute('aj_tokens', tokens, true)
            // move to the next page
            navigator(toLink)
        }).catch(error => setValidationMessage(error.response.data.message));
    }
    const {formik} = useForm(form(), onSubmit);
    return {formik , validationMessage};
}