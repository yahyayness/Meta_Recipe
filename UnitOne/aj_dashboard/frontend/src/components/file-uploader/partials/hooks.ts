import {ChangeEvent, useEffect, useRef, useState} from "react";

const useFileUploader = (field:string, fileHandler:FileHandler | undefined) => {
    // input ref
    const inputRed = useRef<HTMLInputElement>(null)
    //component's FileList
    const [files, setFiles] = useState<FileList>({} as FileList)

    useEffect(()=>{
        if(fileHandler)
            fileHandler({
                [field] : files
            })
    } , [files])

    /**
     * handle Box's onClick event
     * @param event
     * @author Amr
     */
    const fileSelector = (event: ChangeEvent<HTMLInputElement>) => {
        const _files = event?.target?.files || {} as FileList
        setFiles(_files)
    }
    /**
     * open selecting window
     * @author Amr
     */
    const openFileWindow = () => inputRed?.current?.click()
    /**
     * delete uploaded file
     * @param file
     * @param index
     * @author Amr
     */
    const handleDelete = (file: any, index: number) => {
        // convert FileList to Array of files
        // because FileList is a not editable object
        const filesArray = Array.from(files);
        // remove file by the passed index
        filesArray.splice(index, 1);
        // create a new DataTransfer object to
        // push the array's item to it then pushed 'em
        // to FileList
        const dataTransfer = new DataTransfer();
        // push array's item to DataTransfer Object
        filesArray.forEach(file => dataTransfer.items.add(file));
        //create a new FileList object from DataTransfer
        const newFilesList = dataTransfer.files;
        // set the new data
        setFiles(newFilesList);
    };

    return {inputRed , files , handleDelete , openFileWindow , fileSelector }
}
export default useFileUploader;