import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import React from "react";
import {TransitionProps} from "@mui/material/transitions";

/**
  * transaction animation
 * @author Amr
 */
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },

    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * system's dialog
 * @param message
 * @param title
 * @param open
 * @param setOpen
 * @param ok
 * @param close
 * @constructor
 * @author Amr
 */
const AppDialog:React.FC<DialogProps> = ({message , title , open, setOpen,  ok= ()=>{} , close= ()=>{} })=>{

    /**
     * handle ok action
     * @author Amr
     */
    const okHandler = () => {
        setOpen(false);
        ok ();
    };
    /**
     * handle close action
     * @author Amr
     */
    const closeHandler = () => {
        setOpen(false);
        close();
    };

    return(
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeHandler}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={okHandler}>Ok</Button>
                <Button onClick={closeHandler}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AppDialog;