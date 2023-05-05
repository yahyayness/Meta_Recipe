import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import config from "../../partials/config";

/**
 * master layout's header
 * @constructor
 * @author Amr
 */
const AppHeader:React.FC = ()=>{
    const {drawerWidth} = config
    return (
        <AppBar
            className="app-header"
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
            <Toolbar>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;