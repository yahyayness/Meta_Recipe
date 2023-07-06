import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";
 
import React, { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
 import { ClassNames } from "@emotion/react";
 import CheckIcon from '@mui/icons-material/Check';

const ViewItme: React.FC<any> = ({ name, value,key,isCheckd }) => {
    const [open, setOpen] = useState<boolean>(false)


    return (
        <Grid container spacing={2} m={1} height={30}>
            <Grid xs={1}>
                 {isCheckd && <CheckIcon/>}
            </Grid>
            <Grid xs={8}  >
               {name} 
            </Grid>
            <Grid xs={3}>
                {value} %
            </Grid>
        </Grid>
    );
}

export default ViewItme;