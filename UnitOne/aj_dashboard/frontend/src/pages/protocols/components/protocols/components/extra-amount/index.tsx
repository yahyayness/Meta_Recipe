import * as React from 'react';
import {  useState} from "react";

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
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


 /**
     * View  protocal Amount popup Modal
     * @author Bilal
     */

export default function BasicModal(open: any, setOpen: Function, protocol_id : any ) {

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form , setForm] = useState({});
  const [sugar , setSugar] = useState(0);
  const [salt , setSalt] = useState(0);
  const [spicy , setSpicy] = useState(0);
  const {request} = useHttp();
  const {showAlert} = useAlert();
  const {navigator} = useNavigator()

  
  /**
     * Save protocal Amount
     * @author Bilal
     */

  const onSave = () => {
    let _form = {
      protocol:protocol_id,
      sugar:sugar,
      salt:salt,
      spicy:spicy,
    }
    console.log('form', _form, JSON.stringify(_form))
    // change the endpoint according to the isEdit flag
    const endpoint = addParamsToEndpoint(getEndpoint('amount_protocol'), {
      protocol_id,
        id: protocol_id
    }) 
    
    request<ProtocolType>(endpoint, _form).then((response) => {
        const protocol = response?.data?.payload
        showAlert({
            type: AlertTypes.SUCCESS,
            message: `Protocol updated  successfully`
        })
        navigator('/protocols');
    })
}

const handleSugar = (event: Event, newValue: number | number[]) => {
  setSugar(newValue as number);
};
const handleSalt = (event: Event, newValue: number | number[]) => {
  setSalt(newValue as number);
};
const handleSpicy = (event: Event, newValue: number | number[]) => {
  setSpicy(newValue as number);
};
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
            Sugar
            </Typography>
            <Slider  track={false} color={sugar < 0 ? "secondary" : "primary" } min={-50} max={50} onChange={handleSugar} defaultValue={0} aria-label="Default" valueLabelDisplay="on" />
          </Box>
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Salt
            </Typography>
            <Slider   track={false} min={-50} max={50} color={salt < 0 ? "secondary" : "primary" } onChange={handleSalt} defaultValue={0} aria-label="Default" valueLabelDisplay="on" />
          </Box>
          <Box >
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Spicy
            </Typography>
            <Slider   track={false} min={-50} max={50} color={spicy < 0 ? "secondary" : "primary" } onChange={handleSpicy} defaultValue={0} aria-label="Default" valueLabelDisplay="on" />
          </Box>
          <Button onClick={()=>onSave()} variant="contained">Save</Button>
        </Box>
        
      </Modal>
    </div>
  );
}