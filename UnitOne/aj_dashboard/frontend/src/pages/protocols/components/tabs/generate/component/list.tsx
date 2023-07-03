import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";

import React, { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ClassNames } from "@emotion/react";
import ViewItme from "./view-item";

const ListSensory: React.FC<any> = ({ items, name, newTitle,orgTitle }) => {
    const [open, setOpen] = useState<boolean>(false)


    return (
        <>
            <ListItem className="justify-center">{name}</ListItem>
            <Divider />
            <List sx={{ maxHeight: 300, position: 'relative', overflow: 'auto', }}>
                <Grid container spacing={2} m={1}>
                    <Grid xs={10}>
                        <Box >
                            <Grid container>
                                <Grid xs={8} >
                                </Grid>
                                <Grid xs={4} className="generate-new-title">
                                     {newTitle}
                                </Grid>
                               
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid xs={2}>
                         {orgTitle}
                    </Grid>
                </Grid>
                <ViewItme
                    name="Salty"
                    value={80}
                    key="Salty"
                />
                <ViewItme
                    name="Sour"
                    value={0}
                    key="Sour"
                />
                <ViewItme
                    name="Bitter "
                    value={50}
                    key="Bitter "
                />
                <ViewItme
                    name="Umami"
                    value={10}
                    key="Umami"
                />
            </List>

        </>
    );
}

export default ListSensory;