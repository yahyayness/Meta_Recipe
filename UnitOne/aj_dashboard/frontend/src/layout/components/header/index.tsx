import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React, {useEffect, useState} from "react";
import {IconButton, LinearProgress, Menu, MenuItem} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import HttpLoader from "./components/httpLoader";
import useHeaderHook from "./partials/hook";

/**
 * master layout's header
 * @constructor
 * @author Amr
 */
const AppHeader: React.FC = () => {
    const {logout, handleClose, handleMenu, drawerWidth, anchorEl} = useHeaderHook();
    return (
        <AppBar
            className="app-header"
            position="fixed"
            sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
        >
            <HttpLoader/>
            <Toolbar className='app-toolbar'>
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle/>
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
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;