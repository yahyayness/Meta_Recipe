import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import {Handle, Position, useReactFlow} from "reactflow";
import target from '../../../../images/target.svg'
import {IngredientType} from "../../../../types/ModelTypes";


const IngredientRow:React.FC<any> = ({ data, isConnectable, index  , onChange})=>{
    const [value , setValue] = useState<IngredientType>((data.value ?? {}) as IngredientType)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        value[event.target.name] = event.target.value;
        onChange(index ,value);
    }

    const isValidConnection = (connection:any)=>{
        console.log('connection' , connection)
        return true;
    }

    useEffect(()=>{
        console.log('reactFlow', index)
    } , [isConnectable])


    return (

        <Grid container spacing={0}>

            <Grid item xs={8} width='7ch'>
                <FormControl sx={{ m: 1}} variant="outlined"   size="small"  >
                    <OutlinedInput
                        value={value.name}
                        onChange={handleChange}
                        name='name'
                        id="outlined-adornment-weight"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl sx={{ m: 1 }} variant="outlined"   size="small">
                    <OutlinedInput
                        value={value.amount}
                        onChange={handleChange}
                        name='amount'
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">g</InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </FormControl>
            </Grid>

            <Grid item xs={1} className='handle-container'>
                <Handle type={data.type} position={Position.Right} id={index} isConnectable={isConnectable}
                        className="handle-circle"
                        onConnect={data.onConnect}
                        style={{
                            backgroundImage : `url(${target})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        isValidConnection={isValidConnection} />

            </Grid>



        </Grid>
    );
}

export default IngredientRow;