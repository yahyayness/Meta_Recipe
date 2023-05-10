import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const TableActions:React.FC = ()=>{
    return (
        <>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="delete" size="small">
                <DeleteIcon fontSize="small" />
            </IconButton>
        </>
    );
}

export default TableActions;