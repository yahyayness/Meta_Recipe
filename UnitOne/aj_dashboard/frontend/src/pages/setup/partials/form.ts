import * as yup from "yup";
import * as React from "react";
import {http, useHttp} from "../../../plugins/axios";
import {ResponseType} from "../../../types/HttpTypes";
import {UserType} from "../../../types/ModelTypes";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {AlertTypes} from "../../../types/Enums";
import {useForm} from "../../../common/hooks/form";
import {useAlert} from "../../../common/hooks/alert";
import {useNavigator} from "../../../common/routes";
import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";

export const form = (isEdit: boolean = false): Array<FormFields> => [
    {
        field: 'operation_level',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('level of operations is required'),
        }
    },
    {
        field: 'cuisine_requirement_profile',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('cuisine requirements profile is required'),
        }
    },
    {
        field: 'culinary_cultural_profile',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('culinary cultural profile is required'),
        }
    },
 
]



export const useOnSubmitSetupForm = () => {

    const {showAlert} = useAlert();
    const {navigator} = useNavigator()
    const {id} = useParams();
    /* const id = 1; */

    const isEdit = !!id
    const {request} = useHttp();



    /**
     * form's handler
     * @param values
     * @author Amr
     */
    const onSubmit = (values: any, {setSubmitting, setErrors}: any) => {
        
        let _form = {...values}
        delete _form.password_confirmation;
        // change the endpoint according to the isEdit flag
        const endpoint = isEdit? addParamsToEndpoint(getEndpoint('update_setup'), {id}) : getEndpoint('add_setup')
        /**
         * save user
         * @author Amr
         */
        request<UserType>(endpoint, _form).then((response) => {
            const user = response?.data?.payload
            showAlert({
                type: AlertTypes.SUCCESS,
                message: `Setup  ${isEdit ? 'updated' : 'added'}  successfully`
            })
            navigator('/setup');
        }).catch(error => {
            setErrors(error.response.data.payload);
        })
    }
    /**
     * initialize page's form
     */
    let {formik,initialValues} = useForm(form(isEdit), onSubmit)


    useEffect(() => {
        if (id) {
            http<ResponseType<UserType>>(addParamsToEndpoint(getEndpoint('find_setup'), {id})).then(response => {
                // setForm(loadForm(id , response.data.payload));
                formik.setValues(response.data.payload as any)
            })
        }else{
            formik.setValues(initialValues)
        }
    }, [id])

    return {formik}
}