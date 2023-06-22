import * as React from 'react';
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import {addParamsToEndpoint, getEndpoint} from "../../../../../../common/http";
import {http, useHttp} from "../../../../../../plugins/axios";
import {ResponseType} from "../../../../../../types/HttpTypes";
import {  ProtocolType} from "../../../../../../types/ModelTypes";
import {useAlert} from "../../../../../../common/hooks/alert";
import {AlertTypes} from "../../../../../../types/Enums";
import {useNavigator} from "../../../../../../common/routes";
 
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


 /**
     * View  protocal Amount popup Modal
     * @author Bilal
     */

const MessageModal:React.FC<any> = ({message,open,setOpen,onSave}) => {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {request} = useHttp();
  const {showAlert} = useAlert();
  const {navigator} = useNavigator()

  
  /**
     * Save protocal Amount
     * @author Bilal
     */

    const save = () => {
        onSave()
    }
  
 
  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {message}
            </Typography>
            <br/>
           </Box>
          <Button onClick={()=>save()} variant="contained">Save</Button>
          <Button style={{marginLeft:"10px"}} onClick={()=>handleClose()}  >Close</Button>
        </Box>
        
      </Modal>
    </div>
  );
}

export default MessageModal;