import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import {FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import {Handle, Position, useReactFlow} from "reactflow";
import target from '../../../../images/target.svg'
const IngredientRow:React.FC<any> = ({ data, isConnectable, index })=>{
    const reactFlowInstance = useReactFlow();


    const isValidConnection = (connection:any)=>{
        console.log('connection' , connection)
        return true;
    }

    useEffect(()=>{
        console.log('reactFlow', isConnectable)
    } , [isConnectable])


    return (

        <Grid container spacing={0}>

            <Grid item xs={8} width='7ch'>
                <FormControl sx={{ m: 1}} variant="outlined"   size="small">
                    <OutlinedInput
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