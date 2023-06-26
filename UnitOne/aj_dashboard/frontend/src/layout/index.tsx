import React from "react";
import logo from '../images/logo.png'
import './partials/style.scss'
import AppMenu from "./components/Menu";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import config from './partials/config'
import AppHeader from "./components/header";
import {Container, LinearProgress} from "@mui/material";
import AppRoutes from "../routes";
import { Outlet} from "react-router-dom";
import Breadcrumbs from "./components/breadcrumbs";

/**
 * master layout component
 * @constructor
 * @author Amr
 */
const AppLayout: React.FC = () => {
    // this is the width of drawer
    const {drawerWidth} = config
    return (
        <Box sx={{display: 'flex'}}>

            <CssBaseline/>

            <AppHeader/>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar className="logo-container">
                    <img src={logo} alt="logo" className="logo"/>
                </Toolbar>

                <AppMenu/>

            </Drawer>
            <Box
                className='app-container'
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}

            >

                <Breadcrumbs/>
                <Container maxWidth="xl" >
                    <Outlet/>
                </Container>
                <AppRoutes/>
            </Box>
        </Box>
    );
}

export default AppLayout;