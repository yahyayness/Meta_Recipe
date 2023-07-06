import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";

import React, { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ClassNames } from "@emotion/react";
import ViewItme from "./view-item";

const ListProjects: React.FC<any> = ({ items, name , title,listTitle }) => {
    const [open, setOpen] = useState<boolean>(false)


    return (
        <>
            
            <List  >
                <Grid container mt={1}>
                    <Grid xs={8} pl={2} fontWeight={"bold"}>
                        {listTitle}
                    </Grid>
                    <Grid xs={4} fontWeight={"bold"}>
                        {title}
                    </Grid>
                </Grid>
                <ViewItme
                    name="project 1"
                    value={80}
                    key="Salty"
                    isCheckd={true}
                />
                <ViewItme
                    name="project 2"
                    value={0}
                    key="Sour"
                    isCheckd={false}
                />
                <ViewItme
                    name="project 3 "
                    value={50}
                    key="Bitter "
                    isCheckd={false}
                />
                <ViewItme
                    name="project 4"
                    value={10}
                    key="Umami"
                    isCheckd={false}
                />
            </List>

        </>
    );
}

export default ListProjects;