import React, {useState} from 'react';
import './App.scss'
import AppLayout from "./layout";
import AppRoutes from "./routes";
import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import AuthLayout from "./layout/auth";
import {getLocalAttribute} from "./common/helpers";
import {useNavigator} from "./common/routes";
import {REDIRECT_LINK} from "./pages/auth";
import AppAlert from "./components/alert";

const Layouts = {
    auth: <AuthLayout/>,
    app: <AppLayout/>
}
/**
 * application start point
 * @constructor
 * @author Amr
 */
const App: React.FC = () => {

    const [currentLayout, setCurrentLayout] = useState<any>(null)
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname;
        setCurrentLayout(path?.includes('auth') ? Layouts.auth : Layouts.app)
        // Perform other actions based on the route change
    }, [location?.pathname]);
    return (
        <>
            {
                currentLayout && React.cloneElement(currentLayout)
            }
            <AppAlert/>

            {/*<AppLayout/>*/}
        </>


    );
};
export default App;