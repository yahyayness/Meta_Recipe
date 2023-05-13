import config from "../../../partials/config";
import React, {useEffect, useState} from "react";
import {useNavigator} from "../../../../common/routes";
import {useHttp} from "../../../../plugins/axios";
import {getLocalAttribute, setLocalAttribute} from "../../../../common/helpers";
import {getEndpoint} from "../../../../common/http";

const useHeaderHook = ()=>{
    const {drawerWidth} = config
    const [token , setToken] = useState<string>('')
    const {navigator} = useNavigator();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const {request} = useHttp()

    /**
     * open menu
     * @param event
     * @author Amr
     */
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
    /**
     * close menu
     * @author Amr
     */
    const handleClose = () =>setAnchorEl(null);

    const logout = ()=>{

        request(getEndpoint('logout') ,  {}).then(response => {
            setLocalAttribute('aj_tokens' , {} , true)
            setTimeout(()=>{   navigator('/auth/login');} , 500)

        })
        setAnchorEl(null);
    }

    return {logout ,handleClose ,  handleMenu,drawerWidth , anchorEl }
}
export default useHeaderHook;