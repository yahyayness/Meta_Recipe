import List from "@mui/material/List";
import {Collapse, Divider, ListItem} from "@mui/material";
import options from "../../protocols/partials/options";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, {useState} from "react";
import SensoryChart from "./sensory";

const Charts:React.FC<any> = ({tasteData,aromaData})=>{
     
    const data = [
        {
            "taste": "fruity",
            "p1": 107,
            "p2": 110,
            "p3": 113
        },
        {
            "taste": "bitter",
            "p1": 96,
            "p2": 61,
            "p3": 80
        },
        {
            "taste": "heavy",
            "p1": 86,
            "p2": 23,
            "p3": 69
        },
        {
            "taste": "strong",
            "p1": 74,
            "p2": 39,
            "p3": 110
        },
        {
            "taste": "sunny",
            "p1": 115,
            "p2": 77,
            "p3": 108
        }
    ]

    return (
        <List>
            
            <SensoryChart title="Taste" data={data}/>
            <SensoryChart title="Aroma Intensity" data={data}/>
        </List>
    );
}

export default Charts;