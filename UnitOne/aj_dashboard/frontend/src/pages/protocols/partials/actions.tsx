import {IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ProtocolType, UserType} from "../../../types/ModelTypes";
import {AlertTypes} from "../../../types/Enums";
import {Edge, Node} from "reactflow";
import {EndpointType, ResponseType} from "../../../types/HttpTypes";
export const actions = (onSave = ()=>{} , onDuplicate = ()=>{})=> [
    {
        label: 'Duplicate',
        extra: {
            onClick : onDuplicate
        }
    },
    {
        label: 'Save',
        extra: {
            className: 'primary',
            onClick : onSave
            }
        },
] as Array<StackActionsType>