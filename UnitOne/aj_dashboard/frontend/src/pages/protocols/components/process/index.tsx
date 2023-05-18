import {hasExpectedRequestMetadata} from "@reduxjs/toolkit/dist/matchers";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Handle, Position} from "reactflow";
import source from "../../../../images/source.svg";
import target from "../../../../images/target.svg";
import React, {useEffect, useState} from "react";

const Process:React.FC<any> = ({data , isConnectable}) => {
    const [label , setLabel] = useState<string>('');
    useEffect(()=>{
        setLabel(data.label)
        console.log('data' , data)
    } , [data])

    return (
        <div >
            <Card sx={{ maxWidth: 345 , width: 250  }} className='node-item '>
                <CardHeader

                    className="node-item-header process"

                    title={
                        <Typography variant="h6">
                            {label}
                        </Typography>
                    }
                    action={
                        <IconButton aria-label="settings" className='icon'>
                            <CancelIcon />
                        </IconButton>
                    }


                />


                <CardContent>
                    <Box sx={{ width: '100%' , height:50 }}>

                        <Grid  container spacing={1} height={'40px'}  alignItems={'center'}>
                            {(data.inputs || [] ).map((input:any , index:number) => (
                                <>
                                    <Grid item xs={2} >
                                        <Handle type="target" position={Position.Left} id="merge-target" isConnectable={isConnectable}
                                                className="handle-circle target"
                                                style={{
                                                    backgroundImage : `url(${source})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        {React.createElement(input.type , {...(input.props || {}) , size: 'small'})}
                                    </Grid>
                                    <Grid item xs={2} >
                                        <Handle type="source" position={Position.Right} id="merge-source" isConnectable={isConnectable}
                                                className="handle-circle"
                                                style={{
                                                    backgroundImage : `url(${target})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                        />
                                    </Grid>
                                </>


                            ))}
                            {/*<Grid item xs >*/}
                            {/*    <Handle type="source" position={Position.Right} id="merge-source" isConnectable={isConnectable}*/}
                            {/*            className="handle-circle"*/}
                            {/*            style={{*/}
                            {/*                backgroundImage : `url(${target})`,*/}
                            {/*                backgroundSize: 'cover',*/}
                            {/*                backgroundPosition: 'center',*/}
                            {/*            }}*/}
                            {/*    />*/}
                            {/*</Grid>*/}

                        </Grid>
                    </Box>


                </CardContent>




                {/*<CardActions disableSpacing className='node-item-actions'>*/}
                {/*    <IconButton aria-label="add to favorites" onClick={data.addAction}>*/}
                {/*        <AddCircleIcon/>*/}
                {/*    </IconButton>*/}
                {/*</CardActions>*/}
            </Card>

            {/*<Handle*/}
            {/*    type="source"*/}
            {/*    position={Position.Bottom}*/}
            {/*    id="a"*/}
            {/*    style={handleStyle}*/}
            {/*    isConnectable={isConnectable}*/}
            {/*/>*/}

        </div>
           );
}

export default Process;