import './partials/style.scss'
import UploadIcon from '@mui/icons-material/Upload';
import {Chip, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import useFileUploader from "./partials/hooks";
const FileUploader: React.FC<FileUploaderType> = ({label, message , field , fileHandler}) => {

    /**
     * use the useFileUploader which is the custom hook that controls the operation
     * uploading files
     */
    const {inputRed , files , handleDelete , openFileWindow , fileSelector }  = useFileUploader(field , fileHandler);

    return (
       <Box  sx={{ width: '51ch' }} mr={1}>
           <span className='file-uploader-label' >{label}</span>
           <Box className='file-uploader-container' onClick={openFileWindow} mt={1}>
               <input ref={inputRed} type="file" hidden multiple onChange={fileSelector}/>
               <span className='file-uploader-container-text'>{message}</span>
               <span  className='file-uploader-container-icon'> <UploadIcon/></span>
           </Box>
           <div className='uploaded-files'>
               <span></span>
           </div>
           <Box >
               <Stack direction="row"  ml={1} mt={1}  spacing={{ xs: 1, sm: 1 }} useFlexGap flexWrap="wrap">
                   {Array.from(files)?.map((file:any , index:number) =>  <Chip  key={file?.name+index} label={file?.name} onDelete={ ()=> handleDelete (file,index)} />)}
               </Stack>
           </Box>

       </Box>



        
    );
}

export default FileUploader;