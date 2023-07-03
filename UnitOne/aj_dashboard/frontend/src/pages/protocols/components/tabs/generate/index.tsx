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


const Generate: React.FC<any> = ({ tasteIntesity, aromaIntensity }) => {
    const [open, setOpen] = useState<boolean>(false)


    return (
        <List  >

            <ListSensory name="Taste intesity" newTitle="new" orgTitle="Org" items={tasteIntesity} />
            <Divider />
            <ListSensory name="Aroma intensity " newTitle="new" orgTitle="Org" items={aromaIntensity} />
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
                <Button fullWidth variant="contained">Generate</Button>
            </Stack>
        </List>
    );
}

export default Generate;