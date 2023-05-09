interface FormFields{
    field:string,
    value?:any,
    validation?: {
        rules: StringSchema<string | undefined, AnyObject, undefined, "">
    }
}

interface ValidationType {
    [key:string] : Schema
}

interface FormikInitialValuesType { [key:string] : [value:string] }

interface FormikConfigurationType {
    validationSchema : ValidationType,
    initialValues: FormikInitialValuesType

}

type onSubmitFormType = (values:any)=> void