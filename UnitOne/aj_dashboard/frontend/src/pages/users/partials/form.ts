import * as yup from "yup";
import * as React from "react";
import {http} from "../../../plugins/axios";
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
        field: 'first_name',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('First name is required'),
        }
    },
    {
        field: 'last_name',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('Last name is required'),
        }
    },
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
        field: 'email',
        value: '',
        validation: {
            rules: yup
                .string()
                .email('Invalid Email')
                .required('Email is required'),
        }
    },
    {
        field: 'password',
        value: '',
        validation: {
            rules: () => !isEdit ? yup.string().min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required') : yup.string().min(8, 'Password should be of minimum 8 characters length')
        }
    },
    {
        field: 'password_confirmation',
        value: '',
        validation: {
            rules: () => !isEdit ? yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match')
                .required('Please confirm your password') : yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match')

        }
    }
]
/**
 * this hook controls the visibility  of password fields
 * @author Amr
 */
export const usePasswordAnimation = () => {

    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = React.useState(false);
    // toggle the password field's type
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    // prevent the default behaviour of the action
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()
    // toggle the password field's type
    const handleClickShowConfirmedPassword = () => setShowConfirmedPassword((show) => !show);
    // prevent the default behaviour of the action
    const handleMouseDownConfirmedPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault()

    return {
        showPassword,
        showConfirmedPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleClickShowConfirmedPassword,
        handleMouseDownConfirmedPassword
    };
}


export const useOnSubmitUserForm = () => {

    const {showAlert} = useAlert();
    const {navigator} = useNavigator()
    const {id} = useParams();
    const isEdit = !!id



    /**
     * form's handler
     * @param values
     * @author Amr
     */
    const onSubmit = (values: any, {setSubmitting, setErrors}: any) => {

        let _form = {...values}
        delete _form.password_confirmation;
        // change the endpoint according to the isEdit flag
        const endpoint = isEdit? addParamsToEndpoint(getEndpoint('update_user'), {id}) : getEndpoint('add_user')
        /**
         * save user
         * @author Amr
         */
        http<ResponseType<UserType>>(endpoint, _form).then((response) => {
            const user = response?.data?.payload
            showAlert({
                type: AlertTypes.SUCCESS,
                message: `User ${user.first_name + ' ' + user.last_name} ${isEdit ? 'updated' : 'added'}  successfully`
            })
            navigator('/users');
        }).catch(error => {
            showAlert({type: AlertTypes.ERROR, message: error.response.data.message})
            setErrors(error.response.data.payload);
        })
    }
    /**
     * initialize page's form
     */
    let {formik,initialValues} = useForm(form(isEdit), onSubmit)


    useEffect(() => {
        if (id) {
            http<ResponseType<UserType>>(addParamsToEndpoint(getEndpoint('find_user'), {id})).then(response => {
                // setForm(loadForm(id , response.data.payload));
                formik.setValues(response.data.payload as any)
            })
        }else{
            formik.setValues(initialValues)
        }
    }, [id])

    return {formik}
}