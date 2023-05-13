interface FormFields{
    field:string,
    value?:any,
    validation?: {
        rules: StringSchema<string | undefined, AnyObject, undefined, ""> | (() => StringSchema<string | undefined, AnyObject, undefined, "">)
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

type onSubmitFormType = (values:any , extra?: any = {})=> void

type FileHandler = (files:any)=> any
interface FileUploaderType {
    label:string,
    message:string,
    field:string,
    fileHandler? : FileHandler
}