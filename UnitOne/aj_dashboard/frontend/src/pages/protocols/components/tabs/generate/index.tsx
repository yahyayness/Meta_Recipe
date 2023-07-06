import List from "@mui/material/List";
import { Button, Divider, ListItem, Stack } from "@mui/material";
import options from "../../protocols/partials/options";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React,{ useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './style.scss'
import { ClassNames } from "@emotion/react";
import ListSensory from "./component/list";
import { http, useHttp } from "../../../../../plugins/axios";
import { ListType, ProjectType, ProtocolType } from "../../../../../types/ModelTypes";
import { addParamsToEndpoint, getEndpoint } from "../../../../../common/http";

const Generate: React.FC<any> = ({ protocol_id, sensory ,setSensory,afterSave,orgSensory}) => {
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
        <List>

            <ListSensory name="Sensory panel" newTitle="new" orgTitle="Org" items={sensorsList} sensory={sensory} orgSensory={orgSensory} handleSensory={handleSensory} />
            <Divider />
          
            <Divider />
            <Stack m={1} spacing={2}>
                <Grid container >
                    <Grid xs={10}  >
                        Generate projects
                    </Grid>
                    <Grid xs={2}> 
                        2
                    </Grid>
                </Grid>
                <Button fullWidth variant="contained" onClick={() => afterSave()}>Generate</Button>
            </Stack>
        </List>
    );
}

export default Generate;