import React, { useState } from 'react';

import { MenuItem, Menu } from "@mui/material";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";




const DropdownMenu:React.FC<any>  = ({ menuList }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            <IconButton onClick={handleClick} component="label" key={'stack-list-actions'}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {

                        width: '20ch',
                    },
                }}
            >
                {menuList.map((item:any)=>{
                    return (
                        <MenuItem key="" onClick={item.action}>
                            {item.name}
                        </MenuItem>
                    )
                })}
                

            </Menu>
        </div>
    )
}

export default DropdownMenu