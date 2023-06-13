import * as React from 'react';
import { useEffect, useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import { addParamsToEndpoint, getEndpoint } from "../../../../../../common/http";
import { http, useHttp } from "../../../../../../plugins/axios";
import { ResponseType } from "../../../../../../types/HttpTypes";
import { ProtocolType } from "../../../../../../types/ModelTypes";
import { useAlert } from "../../../../../../common/hooks/alert";
import { AlertTypes } from "../../../../../../types/Enums";
import { useNavigator } from "../../../../../../common/routes";

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

const ResetModal: React.FC<any> = ({ open, setOpen, protocol_id, resetprotocol }) => {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sugar, setSugar] = useState(0);
  const [salt, setSalt] = useState(0);
  const [spicy, setSpicy] = useState(0);
  const { request } = useHttp();
  const { showAlert } = useAlert();
  const { navigator } = useNavigator()


  /**
     * Save protocal Amount
     * @author Bilal
     */

  const reset = () => {
    resetprotocol(protocol_id);
 
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
          <h2 id="parent-modal-title"> Warning !! </h2>
          <p id="parent-modal-description">
            Reset Will Delete All Changes. <br/> Are You Sure Reset This Protocol ? 
          </p>
          <Button onClick={() => reset()} variant="contained">Reset</Button>
          <Button style={{ marginLeft: "10px" }} onClick={() => handleClose()}  >Close</Button>
        </Box>

      </Modal>
    </div>
  );
}

export default ResetModal;