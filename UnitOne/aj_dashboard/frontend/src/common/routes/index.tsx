import {useNavigate} from 'react-router-dom';

/**
 * this common function is used to move user's
 * to any passed path
 * @param path
 * @author Amr
 */
export const useNavigator = () => {
    const navigate = useNavigate();
    const navigator = (path: any)=>{
        navigate(path);
    }

    return {navigator};
}

