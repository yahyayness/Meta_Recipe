import {IconButton, Tooltip} from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import React from "react";

const GeneralAction: React.FC<any> = ({onClick, data, icon, tooltip}) => {
    return (
        <Tooltip title={tooltip}>
            <IconButton aria-label={tooltip} size="small" onClick={() => {
                onClick(data)
            }}>
                {React.createElement(icon, {fontSize: 'inherit', color: 'primary'})}
            </IconButton>
        </Tooltip>
    );
}

export default GeneralAction;