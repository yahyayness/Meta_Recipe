import {useCallback, useEffect, useState} from 'react';
import {Handle, Position, Node, ReactFlowProvider} from 'reactflow';
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
import IngredientRow from "../ingredient-row";
const handleStyle = { left: 10 };


const Ingredient:React.FC<any> = ({data , isConnectable} )=>{
    const [children , setChildren] = useState<Array<Node>>([]);
    const onChange = useCallback((evt:any) => {
        console.log(evt.target.value);
    }, []);
    const addMoreIngredient = useCallback((event:any)=>{
        setChildren([...children ,  {
            id: 'A-1',
            type: 'input',
            data: { label: 'Child Node 1' },
            position: { x: 10, y: 2 },
            parentNode: 'node-1',
            extent: 'parent',
        }])
    } , [])

    useEffect(()=>{

    } , [])

    return (
        <div >
            {/*<Handle type="target" position={Position.Top} isConnectable={isConnectable}  />*/}
            <Card sx={{ maxWidth: 345 , width: '139.75ch' }} className='node-item'>
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
                    {data.children?.map((node:any , index:number) => (<IngredientRow data={node} isConnectable={true} index={'ingredient-children-'+index} key={'ingredient-children-'+index}/>))}
                    {/*<IngredientRow data={data} isConnectable={isConnectable}/>*/}
                </CardContent>




                <CardActions disableSpacing className='node-item-actions'>
                    <IconButton aria-label="add to favorites" onClick={data.addAction}>
                        <AddCircleIcon/>
                    </IconButton>
                </CardActions>
            </Card>

            {/*<Handle*/}
            {/*    type="source"*/}
            {/*    position={Position.Bottom}*/}
            {/*    id="a"*/}
            {/*    style={handleStyle}*/}
            {/*    isConnectable={isConnectable}*/}
            {/*/>*/}
            {/*<Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />*/}
        </div>
    );
}

export default Ingredient;