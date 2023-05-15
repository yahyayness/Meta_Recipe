import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import Grid from "@mui/material/Grid";
import CancelIcon from '@mui/icons-material/Cancel';
import Box from "@mui/material/Box";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput
} from "@mui/material";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const handleStyle = { left: 10 };


const Ingredient:React.FC<any> = ({ data, isConnectable })=>{
    const onChange = useCallback((evt:any) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div >
            <Handle type="target" position={Position.Top} isConnectable={isConnectable}  />
            <Card sx={{ maxWidth: 345 , width: '139.75' }} className='node-item'>
                <CardHeader

                    className="node-item-header ingredient"

                    title={
                        <Typography variant="h6">
                            Ingredients
                        </Typography>
                    }
                    action={
                        <IconButton aria-label="settings" className='icon'>
                            <CancelIcon />
                        </IconButton>
                    }


                />


                <CardContent>

                    <Grid container spacing={1}>

                        <Grid item xs={8}>
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
                        <Grid item xs={4}>
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

                        <Grid item xs={8}>
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
                        <Grid item xs={4}>
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

                        <Grid item xs={8}>
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
                        <Grid item xs={4}>
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
                    </Grid>




                </CardContent>




                <CardActions disableSpacing className='node-item-actions'>
                    <IconButton aria-label="add to favorites">
                        <AddCircleIcon/>
                    </IconButton>
                </CardActions>
            </Card>

            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={handleStyle}
                isConnectable={isConnectable}
            />
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default Ingredient;