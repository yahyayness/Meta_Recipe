import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ProtocolType, UserType} from "../../../types/ModelTypes";
import {AlertTypes} from "../../../types/Enums";
import {Edge, Node} from "reactflow";
import {EndpointType, ResponseType} from "../../../types/HttpTypes";

export const actions = (navigator:any , onDuplicate : any, onDelete: any )=> [
    {
        label: 'Duplicate',
        extra: {
            // className: 'primary',
            onClick : ()=>  onDuplicate()
        }
    },
    {
        label: 'Create new',
        extra: {
            className: 'primary',
            onClick : ()=>{
                navigator("/protocols/create");
            }
        }
    },
    /* {
        label: 'Delete',
        extra: {
            onClick : ()=>  onDelete()
        }
    }, */
    // {
    //     label: 'Compare',
    //     extra: {
    //
    //         onClick : ()=>{
    //             alert('Compare')
    //         }
    //     }
    // },
    {
        component: <IconButton aria-label="upload picture" component="label" key={'stack-list-actions'}>
            <MoreVertIcon/>
        </IconButton> 
    },

] as Array<StackActionsType>