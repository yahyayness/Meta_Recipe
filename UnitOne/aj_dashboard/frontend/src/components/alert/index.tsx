import {Alert, Snackbar} from "@mui/material";
import {useAlert} from "./partials/hook";

const AppAlert: React.FC = () => {
    const {onClose, open, type, message, DURATION} = useAlert()
    return (
        <Snackbar open={open} autoHideDuration={DURATION} onClose={onClose}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}>
            {type &&
                <Alert onClose={onClose} severity={type} sx={{width: '100%'}}>
                    {message}
                </Alert>
            }

        </Snackbar>);
}

export default AppAlert;