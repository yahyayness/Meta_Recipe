import {Button,Stack} from "@mui/material";
import {useState} from "react";

/**
 * this is the list of actions that lie and the top of tables
 *
 * @param actions
 * @constructor
 * @author Amr
 */
const StackActions:React.FC<StackActionsProps> = ({actions})=>{
    const [listActions , setListActions] = useState(actions);
    return (
        <Stack spacing={2} direction="row"  justifyContent="right" className="list-master-actions">
            {
                listActions?.map((item:StackActionsType,index:number) =>  item.label ?  <Button key={'stack-list-'+index} variant="text" color="info" {...item?.extra ?? {}}>{item.label}</Button>:  item.component)
            }
        </Stack>
    );
}

export default StackActions;