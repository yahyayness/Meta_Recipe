import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";

import React, { useState,useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ClassNames } from "@emotion/react";
import ViewItme from "./view-item";
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';

const ExtraList: React.FC<any> = ({ items, name, newTitle,orgTitle, setitems }) => {
    const [copy, setCopy] = useState<boolean>(true)
    const [orgItems, setOrgItems] = useState<any>({});
    const handelItems = (value:number,name:string)=>{
        setitems({...items,[name]:value})
    }

    const handelIncresing = (value:number,name:string)=>{
        value <= 10 && handelItems(value,name)
    }

   

    const handelDecresing = (value:number,name:string)=>{
        value >= 0 && handelItems(value,name)
    }

    useEffect(() => {
        copy && setOrgItems({...items})
        setCopy(false)
      }, [items])

    return (
        <>
            <ListItem className="justify-center">{name}</ListItem>
            
            <List sx={{ maxHeight: 350, position: 'relative', overflow: 'auto', }}>
                <Grid container spacing={2} m={1}>
                    <Grid xs={10}>
                        <Box >
                            <Grid container>
                                <Grid xs={8} >
                                </Grid>
                                <Grid xs={4} className="design-new-title">
                                     {newTitle}
                                </Grid>
                               
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid xs={2} className="design-org-title">
                         {orgTitle}
                    </Grid>
                </Grid>
                {
                    Object.keys(items).map((key)=>{
                        var nValue : number = Number(items[key]);
                        var oValue : number = Number(orgItems[key]);
                        return(
                            <Grid container spacing={2} m={1}>
                            <Grid xs={10} className="design-taste-items" style={{ background: `linear-gradient(90deg, rgba(49, 114, 220, 0.1) ${nValue*10}%, #FFF 0%)` }}>
                                <Box className="design-taste-bg">
                                    <Grid container>
                                        <Grid xs={1} onClick={() => handelDecresing(nValue-.5, key)} className="design-arrow">
                                        <ArrowLeftOutlinedIcon />
                                        </Grid>
                                        <Grid xs={7} className="design-taste-name">
                                            {key}
                                        </Grid>
                                        <Grid xs={3} className="design-taste-new-value">
                                            {nValue}
                                        </Grid>
                                        <Grid xs={1} onClick={() =>handelIncresing(nValue+.5, key)} className="design-arrow">
                                        <ArrowRightOutlinedIcon />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Grid>
                            <Grid xs={2}>
                                {oValue}
                            </Grid>
                        </Grid>
                        )
                        

                    })
                }
                
            </List>
            
        </>
    );
}

export default ExtraList;