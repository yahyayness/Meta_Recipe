import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
export const actions = (navigator:any)=> [
    {
        label: 'Duplicate',
        extra: {
            onClick : ()=>{
                alert('Duplicate')
            }
        }
    },
    {
        label: 'Create new',
        extra: {
            onClick : ()=>{
                navigator("/projects/create");
            }
        }
    },
    {
        label: 'Compare',
        extra: {
            className: 'primary',
            onClick : ()=>{
                alert('Compare')
            }
        }
    },
    {
        component: <IconButton aria-label="upload picture" component="label" key={'stack-list-actions'}>
                         <MoreVertIcon/>
                   </IconButton>
    },

] as Array<StackActionsType>