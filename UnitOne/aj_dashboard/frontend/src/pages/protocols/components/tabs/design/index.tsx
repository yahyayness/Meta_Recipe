import List from "@mui/material/List";
import { Button, Divider, ListItem, Stack } from "@mui/material";
import options from "../../protocols/partials/options";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState,useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './style.scss'
import { ClassNames } from "@emotion/react";
import ListSensory from "./component/list";
import { ListType, ProjectType } from "../../../../../types/ModelTypes";
import { getEndpoint } from "../../../../../common/http";
import { http } from "../../../../../plugins/axios";


const Design: React.FC<any> = ({  protocol_id, sensory ,setSensory,afterSave,orgSensory, onSave }) => {
    const [sensorsList, setSensorsList] = useState<any>([]);

    useEffect(() => {
        http<ListType<ProjectType>>(getEndpoint('all_sensors'), { params: { page_size: 12 } }).then(response => {
          setSensorsList(response.data.payload?.results)
        })
    
      }, [])
    
      const handleSensory = ( newValue: number | number[], key: string,id : number) => {
          setSensory(sensory.map((el:any) => (el.id === id ? {...el, ["value"]:newValue} : el)))
      };


    return (
        <List  >
           
        <ListSensory name="Sensory panel" newTitle="new" orgTitle="Org" items={sensorsList} sensory={sensory} orgSensory={orgSensory} handleSensory={handleSensory} />
        <Divider />
        <Stack direction="row" spacing={2}>
            <Button >Revert</Button>
            <Button >Fork</Button>
            <Button variant="contained">Save</Button>
        </Stack>
    </List>
    );
}

export default Design;