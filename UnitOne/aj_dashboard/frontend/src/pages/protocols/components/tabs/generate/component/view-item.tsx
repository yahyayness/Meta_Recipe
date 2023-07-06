import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";

import React,{ useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ClassNames } from "@emotion/react";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const ViewItme: React.FC<any> = ({ name, value, key,onChange }) => {
    const [nvalue, setNvalue] = useState<number>(value)

    const handelIncresing = ()=>{
        nvalue < 10 && onChange(nvalue+.5) && setNvalue(nvalue+.5)
         
    }
    const handelDecresing = ()=>{
        nvalue > 0 && onChange(nvalue-.5) && setNvalue(nvalue-.5)
    }

   


    return (
        <Grid container spacing={2} m={1}>
            <Grid xs={10} className="generate-taste-items" style={{ background: `linear-gradient(90deg, rgba(255, 97, 102, 0.1) ${nvalue*10}%, #FFF 0%)` }}>
                <Box className="generate-taste-bg">
                    <Grid container>
                        <Grid xs={1} onClick={handelDecresing} className="generate-arrow">
                            <ArrowLeftOutlinedIcon />
                        </Grid>
                        <Grid xs={7} className="generate-taste-name">
                            {name}
                        </Grid>
                        <Grid xs={3} className="generate-taste-new-value">
                            {nvalue}
                        </Grid>
                        <Grid xs={1} onClick={handelIncresing} className="generate-arrow">
                            <ArrowRightOutlinedIcon />
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid xs={2}>
                {value}
            </Grid>
        </Grid>
    );
}

export default ViewItme;