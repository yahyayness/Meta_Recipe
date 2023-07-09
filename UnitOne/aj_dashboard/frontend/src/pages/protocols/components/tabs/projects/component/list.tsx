import List from "@mui/material/List";
import { Box, Divider, ListItem, Stack } from "@mui/material";

import React, { useState,useEffect } from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { ClassNames } from "@emotion/react";
import ViewItme from "./view-item";
import { ProtocolType, ListType } from "../../../../../../types/ModelTypes";
import { addParamsToEndpoint, getEndpoint } from "../../../../../../common/http";
import { http, useHttp } from "../../../../../../plugins/axios";


const ListProjects: React.FC<any> = ({ protocol_id, title,listTitle }) => {

    const [protocolsList, setProtocolsList] = useState<Array<ProtocolType>>([])

    useEffect(() => {
        if (protocol_id) {
            http<ListType<ProtocolType>>(addParamsToEndpoint(getEndpoint('similar_protocols'), { id: protocol_id })).then(response => {
                console.log("response>>>>>>", response)
               setProtocolsList([...response.data.payload])
              
            })
        }
    }, [protocol_id])

    console.log(protocolsList)  
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
                {
                  protocolsList.map((protocol)=>{
                    return (
                        <ViewItme
                        name={protocol.name}
                        value={protocol.is_draft ? "Draft" : " Published"}
                        key={protocol.id}
                        protocol_id={protocol.id}
                        isCheckd={protocol.id == protocol_id ? true : false}
                    />
                    )
                  })
                }
               
               
            </List>

        </>
    );
}

export default ListProjects;