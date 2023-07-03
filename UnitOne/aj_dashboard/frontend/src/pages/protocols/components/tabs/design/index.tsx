import List from "@mui/material/List";
import { Button, Divider, ListItem, Stack } from "@mui/material";
import options from "../../protocols/partials/options";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import './style.scss'
import { ClassNames } from "@emotion/react";
import ListSensory from "./component/list";


const Design: React.FC<any> = ({ tasteIntesity, aromaIntensity }) => {
    const [open, setOpen] = useState<boolean>(false)


    return (
        <List  >
           
        <ListSensory name="Taste intesity" title="new" items={tasteIntesity} />
        <Divider />
        <ListSensory name="Taste intesity" title="new" items={aromaIntensity} />
        <Stack direction="row" spacing={2}>
            <Button >Revert</Button>
            <Button >Fork</Button>
            <Button variant="contained">Save</Button>
        </Stack>
    </List>
    );
}

export default Design;