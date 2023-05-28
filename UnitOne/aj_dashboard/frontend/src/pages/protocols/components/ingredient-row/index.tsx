import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid";
import {FormControl, InputAdornment, OutlinedInput} from "@mui/material";
import {Handle, Position, useReactFlow} from "reactflow";
import target from '../../../../images/target.svg'
import {IngredientType} from "../../../../types/ModelTypes";


const IngredientRow:React.FC<any> = ({ data, isConnectable, index  , onChange})=>{
    const [value , setValue] = useState<IngredientType>((data?.data.value ?? {}) as IngredientType)
    const [amount , setAmount] = useState(data?.data?.value?.amount ?? '')
    const [name , setName] = useState(data?.data?.value?.name ?? '')
    const [unit, setUnit] = useState(data?.data?.value?.unit ?? 'g')

    /**
     * this object includes the set methods of component's states
     * so, you can call whatever set method you want by passing the name of state
     * @param name
     * @author Amr
     */
    const set = (name:string)=> {
        const setMethods:any =  {
            'amount' : setAmount,
            'name' : setName
        }
        return  setMethods[name]
    }
    /**
     * handle the changes of component's inputs
     * @param event
     * @author Amr
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        set(event.target.name)( ''+ event.target.value)
        onChange(index , {name , amount , unit , [event.target.name] : event.target.value });
    }

    const isValidConnection = (connection:any)=>  true




    return (

        <Grid container spacing={0}>

            <Grid item xs={7} width='7ch' >
                <FormControl sx={{ m: 1}} variant="outlined"   size="small"  >
                    <OutlinedInput
                        value={name}
                        onInput={handleChange}
                        name='name'
                        id="outlined-adornment-weight"
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl sx={{ m: 1 }} variant="outlined"   size="small">
                    <OutlinedInput
                        className={'number-input'}
                        type='number'
                        value={amount}
                        onInput={handleChange}
                        name='amount'
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">{unit}</InputAdornment>}
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