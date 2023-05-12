import * as yup from "yup";
import * as React from "react";

export const form = ():Array<FormFields> =>  [

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