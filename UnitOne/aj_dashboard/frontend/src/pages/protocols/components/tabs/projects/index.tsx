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
import ListProjects from "./component/list";


const Projects: React.FC<any> = ({ tasteIntesity, aromaIntensity }) => {
    const [open, setOpen] = useState<boolean>(false)


    return (
        <List  >
            <ListProjects name="Taste intesity" title="Gen. Match" items={aromaIntensity} listTitle="Projects" />
        </List>
    );
}

export default Projects;