import * as yup from "yup";
import * as React from "react";

export const form = ():Array<FormFields> =>  [
    {
        field: 'name',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('Name is required'),
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
            rules: yup
                .string()
                .min(8, 'Password should be of minimum 8 characters length')
                .required('Password is required'),
        }
    },
    {
        field: 'password_confirmation',
        value: '',
        validation: {
            rules: yup.string()
                .oneOf([yup.ref('password'), ''], 'Passwords must match')
                .required('Please confirm your password')
        }
    }
]
/**
 * this hook controls the visibility  of password fields
 * @author Amr
 */
export const usePasswordAnimation  = ()=>{

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

    return {showPassword , showConfirmedPassword , handleClickShowPassword , handleMouseDownPassword ,  handleClickShowConfirmedPassword , handleMouseDownConfirmedPassword};
}