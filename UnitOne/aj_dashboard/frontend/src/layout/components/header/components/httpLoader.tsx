import {isAll} from "../../../../utilities/progress";
import {LinearProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AlertPropsType} from "../../../../types/Alert";
import {bool, boolean} from "yup";

const HttpLoader:React.FC = ()=>{
    const [showLoader, setShowLoader] = useState<boolean>(false
    )
    /**
     * redux state
     * @author Amr
     */
    const state = useSelector(state => state)
    /**
     * handel the changes of Breadcrumb
     * @author Amr
     */
    useEffect(() => {
        const configurations = (state as any).httpLoader
        setShowLoader(configurations)
    }, [(state as any)])
    return ( <>{ showLoader ? <LinearProgress color='info' style={{position:"absolute" , width:'100%'}} /> : ''} </>);

}

export default HttpLoader;