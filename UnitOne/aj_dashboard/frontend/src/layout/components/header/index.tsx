import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, {useEffect, useState} from "react";
import config from "../../partials/config";
import {IconButton, Menu, MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import {http} from "../../../plugins/axios";
import {getEndpoint} from "../../../common/http";
import {getLocalAttribute, setLocalAttribute} from "../../../common/helpers";
import {useNavigator} from "../../../common/routes";

/**
 * master layout's header
 * @constructor
 * @author Amr
 */
const AppHeader:React.FC = ()=>{
    const {drawerWidth} = config
    const [token , setToken] = useState<string>('')
    const {navigator} = useNavigator();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    useEffect(()=> setToken(getLocalAttribute('aj_tokens' , true)?.access) , [])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        http(getEndpoint('logout') ,  {}).then(response => {
            setLocalAttribute('aj_tokens' , {} , true)
            setTimeout(()=>{   navigator('/auth/login');} , 1000)

        })
    };



    return (
        <AppBar
            className="app-header"
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar  className='app-toolbar'>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;