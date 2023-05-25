import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Handle, Position} from "reactflow";
import target from "../../../../images/target.svg";
import source from "../../../../images/source.svg";

const Serve:React.FC<any> = ({data , isConnectable , id})=>{
    return (
        <div >
            {/*<Handle type="target" position={Position.Top} isConnectable={isConnectable}  />*/}
            <Card sx={{ maxWidth: 345 , width: 150  }} className='node-item '>
                <CardHeader

                    className="node-item-header serve"

                    title={
                        <Typography variant="h6">
                            Serve
                        </Typography>
                    }
                    action={
                        <IconButton aria-label="settings" className='icon' onClick={()=> data.onClose(id)}>
                            <CancelIcon />
                        </IconButton>
                    }


                />


                <CardContent>
                    <Box sx={{ width: '100%' , height:50 }}>
                        <Grid  container spacing={1} height={'50px'}  alignItems={'center'}>
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
                            <Grid item xs >
                                <Handle type="target" position={Position.Left} id={`${id}-target`} isConnectable={isConnectable}
                                        className="handle-circle target"
                                        style={{
                                            backgroundImage : `url(${source})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                />
                            </Grid>
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

export default Serve;