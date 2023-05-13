import RouteList from './list'
import {Routes, Route, Router} from 'react-router-dom';
import React from "react";
import {CircularProgress} from "@mui/material";

/**
 * loader appears before loading the route's component
 * @constructor
 * @author Amr
 */
const Loading = () =>    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                            <CircularProgress color="inherit" />
                        </div>;

/**
 * app routes
 * @constructor
 * @author Amr
 */
const AppRoutes: React.FC = () => {
    return (
        <React.Suspense fallback={<Loading />}>
            <Routes>
            {
                RouteList?.map(parentRoute => {
                        return (
                            <Route path={parentRoute?.path} key={parentRoute?.path}>
                                {
                                    parentRoute?.children?.map(route => <Route  key={parentRoute?.path + route.path} path={parentRoute?.path + route.path}
                                                                              element={React.createElement(route.component)}/>)
                                }
                            </Route>
                        );
                    }
                )
            }
        </Routes>
        </React.Suspense>
    );
}

export default AppRoutes;