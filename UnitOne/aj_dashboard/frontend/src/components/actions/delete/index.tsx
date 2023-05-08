import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AppDialog from "../../dialog";
import {useState} from "react";

const DeleteAction:React.FC<DeleteActionProps> = ({onClick , data})=>{
    /**
     * controls the confirmation's dialog
     * @author Amr
     */
    const [showConfirmation , setShowConfirmation] = useState<boolean>(false);
    /**
     * handle the ok action
     * @author Amr
     */
    const ok = ()=> onClick(data)

    return (
        <>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" size="small" onClick={()=>setShowConfirmation(true)}>
                    <DeleteIcon fontSize="inherit" color='error'/>
                </IconButton>
            </Tooltip>
            <AppDialog title="Confirmation" message="Are you sure that you want to delete this resource?" open={showConfirmation} setOpen={setShowConfirmation} ok={ok}/>
        </>

    );
}

export default DeleteAction;