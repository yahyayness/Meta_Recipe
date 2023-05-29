import * as yup from "yup";
import * as React from "react";
import {useEffect, useState} from "react";
import {useAlert} from "../../../common/hooks/alert";
import {useNavigator} from "../../../common/routes";
import {useParams} from "react-router-dom";
import {http, useHttp} from "../../../plugins/axios";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ProjectType, UserType} from "../../../types/ModelTypes";
import {AlertTypes} from "../../../types/Enums";
import {useForm} from "../../../common/hooks/form";
import {ResponseType} from "../../../types/HttpTypes";

export const form = (isEdit:boolean): Array<FormFields> => [
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
                .required('Description is required'),
        }
    }
]

interface FileType {
    [key:string] : FileList
}

/**
 * handle the uploading of product
 * @author Amr
 */
export const useProductFiles = () => {
    const [files, setFiles] = useState<FileType>({})

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

export const useOnSubmitProjectForm = () => {

    const {showAlert} = useAlert();
    const {navigator} = useNavigator()
    const {id} = useParams();
    const isEdit = !!id
    const {request} = useHttp();
    const {files, fileHandler}= useProductFiles();


    /**
     * form's handler
     * @param values
     * @author Amr
     */
    const onSubmit = (values: any, {setSubmitting, setErrors}: any) => {

        let _form = {...values}

        const formData = new FormData();

        for (const key in _form) {
            if (_form.hasOwnProperty(key)) {
                formData.append(key, _form[key]);
            }
        }
        for (const key in files) {
            // const values = [ ...(files[key] as FileList).files]
            for (let i = 0; i < files[key].length; i++) {
                formData.append(key+'[]',files[key][i]);
            }
            // if (Object.prototype.hasOwnProperty.call(files, key)) {
            //
            // }
        }

        console.log('Form' , formData)
        // change the endpoint according to the isEdit flag
        const endpoint = isEdit? addParamsToEndpoint(getEndpoint('edit_project'), {id}) : getEndpoint('add_project')
        /**
         * save user
         * @author Amr
         */
        request<ProjectType>(endpoint, formData , {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            const user = response?.data?.payload
            showAlert({
                type: AlertTypes.SUCCESS,
                message: `Project ${user.name} ${isEdit ? 'updated' : 'added'}  successfully`
            })
            navigator('/projects');
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
            http<ResponseType<ProjectType>>(addParamsToEndpoint(getEndpoint('find_project'), {id})).then(response => {
                // setForm(loadForm(id , response.data.payload));
                formik.setValues(response.data.payload as any)
            })
        }else{
            formik.setValues(initialValues)
        }
    }, [id])

    return {formik, fileHandler}
}