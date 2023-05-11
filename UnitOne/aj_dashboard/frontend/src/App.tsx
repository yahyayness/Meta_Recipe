import React, {useState} from 'react';
import './App.scss'
import AppLayout from "./layout";
import AppRoutes from "./routes";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AuthLayout from "./layout/auth";

const Layouts = {
    auth : <AuthLayout/>,
    app: <AppLayout/>
}
/**
 * application start point
 * @constructor
 * @author Amr
 */
const App: React.FC = () => {

    const [currentLayout , setCurrentLayout] = useState<any>(null)
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname;
        if(path?.includes('auth')){
            console.log(`Route changed to ${location.pathname}`);
            setCurrentLayout(Layouts.auth)
        }

        else
            setCurrentLayout(Layouts.app)
        console.log(`Route changed to ${location.pathname}`);
        // Perform other actions based on the route change
    }, [location?.pathname]);
    return (
        <>
            {
                currentLayout && React.cloneElement(currentLayout)
            }
            <AppRoutes/>
            {/*<AppLayout/>*/}
        </>


    );
};
export default App;