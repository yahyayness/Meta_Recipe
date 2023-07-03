import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";
 
import React, { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
 import { ClassNames } from "@emotion/react";


const ViewItme: React.FC<any> = ({ name, value,key }) => {
    const [open, setOpen] = useState<boolean>(false)


    return (
        <Grid container spacing={2} m={1}>
            <Grid xs={10} className="taste-items">
                <Box width={`${value}%`} className="taste-bg">{name}</Box>
            </Grid>
            <Grid xs={2}>
                {value}
            </Grid>
        </Grid>
    );
}

export default ViewItme;