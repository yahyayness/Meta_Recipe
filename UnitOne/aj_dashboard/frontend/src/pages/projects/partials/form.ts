import * as yup from "yup";
import * as React from "react";
import {useState} from "react";

export const form = (): Array<FormFields> => [
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
        field: 'date',
        value: '',
        validation: {
            rules: yup
                .string()
                .required('Username is required'),
        }
    },
    {
        field: 'description',
        value: '',
        validation: {
            rules: yup
                .string()
                .email('Invalid Email')
                .required('Email is required'),
        }
    }
]

/**
 * handle the uploading of product
 * @author Amr
 */
export const useProductFiles = () => {
    const [files, setFiles] = useState({})

    /**
     * catches the list of files from file's uploader
     * @param files
     * @author Amr
     */
    const fileHandler = (files: {}) => {
        setFiles(_files => {
            return {..._files, ...files,};
        })
    }

    return {files, fileHandler}
}