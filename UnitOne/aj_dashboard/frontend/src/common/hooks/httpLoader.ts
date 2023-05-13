import {useDispatch} from "react-redux";
import {showLoader} from "../../plugins/redux/reducers/httpLoader";

export const useHttpLoader = ()=>{
    const dispatch = useDispatch();
    const show= (flag:boolean)=> dispatch(showLoader(flag))
    return {show}
}