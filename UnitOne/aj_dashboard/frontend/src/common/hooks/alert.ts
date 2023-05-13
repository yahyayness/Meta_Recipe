import useBreadcrumb from "../hooks/breadcrumbs";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setBreadcrumbs} from "../../plugins/redux/reducers/breadcrumbs";
import {show} from "../../plugins/redux/reducers/alert";
import {AlertPropsType} from "../../types/Alert";

export const useAlert = ()=>{
    const dispatch = useDispatch();
    const showAlert = (config:AlertPropsType)=> dispatch(show(config))
    return {showAlert}


}