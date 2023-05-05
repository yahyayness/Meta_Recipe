import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setBreadcrumbs} from "../../plugins/redux/reducers/breadcrumbs";

/**
 * @common
 *  this function sets the passed breadcrumbs
 * @param breadcrumbs
 * @author Amr
 */
const useBreadcrumb = (breadcrumbs: Array<BreadcrumbType>)=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        // send breadcrumbs to redux
        dispatch(setBreadcrumbs(breadcrumbs))
    },[])
}

export default useBreadcrumb;