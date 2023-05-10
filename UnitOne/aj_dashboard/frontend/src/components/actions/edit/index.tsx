import {IconButton, Tooltip} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
const EditAction:React.FC<EditActionProps> = ({onClick , data})=>{

    return (
        <Tooltip title="Edit">
            <IconButton aria-label="delete" size="small" onClick={()=> {
                onClick(data)
            }}>
                <DriveFileRenameOutlineIcon fontSize="inherit" color='success'/>
            </IconButton>
        </Tooltip>
    );
}

export default EditAction;