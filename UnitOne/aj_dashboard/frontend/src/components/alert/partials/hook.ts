import {useEffect, useState} from "react";
import {AlertTypes} from "../../../types/Enums";
import {useSelector} from "react-redux";
import {AlertPropsType} from "../../../types/Alert";

/**
 * time duration of showing alert
 * @author Amr
 */
const DURATION = 6000;

/**
 * custom hook for managing alert
 * @author Amr
 */
export const useAlert = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<AlertTypes | undefined>(undefined)
    const [message, setMessage] = useState<string>('')
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
        const configurations = (state as any).alert as AlertPropsType
        if (!configurations.type)
            return;
        setType(configurations.type)
        setMessage(configurations.message)
        setOpen(true)
    }, [(state as any).alert])

    /**
     * reset Alert configurations
     */
    const resetAlert = () => {
        setType(undefined)
        setMessage('')
        setOpen(false)
    }
    /**
     * handle closing operation
     * @param event
     * @param reason
     * @author Amr
     */
    const onClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        resetAlert()
    };

    return {onClose, open, type, message, DURATION}

}