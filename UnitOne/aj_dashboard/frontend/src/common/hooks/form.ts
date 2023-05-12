import {useFormik} from "formik";
import {useEffect} from "react";
import * as yup from "yup";
import {prepareAutoBatched} from "@reduxjs/toolkit";

/**
 * this function setsUp the required configurations
 * of formik object
 *
 * @param form
 * @author Amr
 */
const setUpConfigurations = (form:Array<FormFields>) : FormikConfigurationType =>{
    const validationSchema:ValidationType = {};
    const initialValues: { [key:string] : [value:string] } = {};

    // you gotta walk through the form fields
    // and extract the validation rules and the
    // initial value for each field
    for (let row of form) {
        if (row.validation) {
            // update the validationSchema object with
            // the rules of every field
            validationSchema[row.field] = row.validation.rules instanceof Function ? row.validation.rules() : row.validation.rules;
        }
        // update the initialValues object with
        // the initial value of every field
        initialValues[row.field] = row.value;
    }

    // export the objects
    return {validationSchema , initialValues};

}
export const useForm = (form:Array<FormFields> , onSubmit:onSubmitFormType)=>{
    // read the validationSchema and initialValues objects from prepareValidation
    const {validationSchema , initialValues} = setUpConfigurations(form)

    // initialise the formik object
    const formik =  useFormik({
        initialValues:initialValues,
        validationSchema : yup.object().shape(validationSchema),
        onSubmit: (values, { setSubmitting, setErrors }) => {

            onSubmit(values, { setSubmitting, setErrors });

        },
    });

    return {formik,initialValues}

}

