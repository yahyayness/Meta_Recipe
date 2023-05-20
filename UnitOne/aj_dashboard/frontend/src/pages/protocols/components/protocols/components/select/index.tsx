import {FormControl, InputLabel, MenuItem} from "@mui/material";
import {useEffect, useState} from "react";
import Select, { SelectChangeEvent } from '@mui/material/Select';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const ProtocolSelect:React.FC<any> = ({options , onChange})=> {
    const [value,setValue] = useState<any>('');
    const [open, setOpen] = useState(false);
    const handleChange = (event: any) => {
        setValue(event.target.value as string);
        onChange(event.target.value as string);
        // setOpen(false)
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleOpen = () => {
    //     alert('ss')
    //     setOpen(true);
    // };
    const handleOpen = ()=> {
        console.log('value' , open)
        setOpen(open => !open)
    }

    useEffect(()=>{
        console.log('options' ,options )
    } , [options])
    return (
        <FormControl fullWidth>
            <InputLabel id="process-options-label">Size</InputLabel>
            <Select
                labelId="process-options-label"
                id="process-options"
                value={value}
                open={open}
                // onClose={handleClose}
                // onOpen={handleOpen}
                label="Size"
                MenuProps={MenuProps}
                onChange={handleChange}
                onClick={handleOpen}
                // onSelect={handleOpen}

            >
                {options.map((item:any) => (<MenuItem value={item.value}    key={'options-'+item.label+'-'+item.value}>{item.label}</MenuItem>))}

            </Select>
        </FormControl>
    );
}

export default ProtocolSelect;