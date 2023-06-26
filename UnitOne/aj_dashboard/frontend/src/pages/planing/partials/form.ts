import * as yup from "yup";

export const form = (isEdit:boolean): Array<FormFields> => [
    {
        field: 'title',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('Title is required'),
        }
    },
    {
        field: 'start',
        value: new Date().toISOString().split('T')[0],
        validation: {
            rules: yup
                .string()
                .required('Date is required'),
        }
    },
    {
        field: 'end',
        value: new Date().toISOString().split('T')[0],
        validation: {
            rules: yup
                .string()
                .required('Date is required'),
        }
    },
    {
        field: 'description',
        value: '',

    }
]