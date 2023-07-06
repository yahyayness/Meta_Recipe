import List from "@mui/material/List";
import { Collapse, Divider, ListItem } from "@mui/material";
import options from "../../protocols/partials/options";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useEffect, useState } from "react";
import SensoryChart from "./sensory";
import './style.scss'
import { ProtocolType, ListType } from "../../../../../types/ModelTypes";
import { addParamsToEndpoint, getEndpoint } from "../../../../../common/http";
import { http, useHttp } from "../../../../../plugins/axios";


const Charts: React.FC<any> = ({ protocol_id }) => {
    //const [protocols, setProtocols] = useState<Array<ProtocolType>>([])
    const [sensoryPanelChart, setSensoryPanelChart] = useState([])
    const [tasteIntensityChart, setTasteIntensityChart] = useState([])
    const [aromaIntensityChart, setAromaIntensityChart] = useState([])
    const [nutritionInfoChart, setNutritionInfoChart] = useState([])
    const [textureMetricsChart, setTextureMetricsChart] = useState([])
    const [protocolsKeys, setProtocolsKeys] = useState<any>([])
    const [finsh, setFinsh] = useState<number>(0)
    const { request } = useHttp();

    useEffect(() => {
        if (protocol_id) {
            http<ListType<ProtocolType>>(addParamsToEndpoint(getEndpoint('similar_protocols'), { id: protocol_id })).then(response => {
                console.log("response>>>>>>", response)

                buildChartData([...response.data.payload])
            })
        }
    }, [protocol_id])

    const buildChartData = async (protocols: any) => {
        let data: any = [];
        let dataTasteIntensity: any = [];
        if (protocols.length) {
            for (const protocol of protocols) {
             
                setProtocolsKeys([...protocolsKeys,protocol.name])
                let protocolSensoryPanel = protocol?.custom_sensory_panels
                let protocolTasteIntensity = protocol?.taste_intensity
                let protocolAromaIntensity = protocol?.aroma_intensity
                let protocolNutritionInfo = protocol?.nutrition_info
                let protocolTextureMetrics = protocol?.texture_metrics
                for (const sensoryPanel of protocolSensoryPanel){
                 
                    console.log("sensoryPanel",sensoryPanel)
                    let index = data.findIndex((data: any) => data["taste"] == sensoryPanel.variable)
                    if (index > -1) {
                        data[index][protocol.name] = sensoryPanel.value;
                    } else {
                        data.push({
                            "taste": sensoryPanel.variable,
                            [protocol.name]: sensoryPanel.value
                        });
                    }
                }
                 
                Object.keys(protocolTasteIntensity).map((key,index)=>{
                    var nValue : number = Number(protocolTasteIntensity[key]);
                    let indexm = dataTasteIntensity.findIndex((dataTasteIntensity: any) => dataTasteIntensity["taste"] == key)
                    if (indexm > -1) {
                        dataTasteIntensity[index][protocol.name] = nValue;
                    } else {
                        dataTasteIntensity.push({
                            "taste": key,
                            [protocol.name]: nValue
                        });
                    }

                })

                setFinsh(finsh+1)
            }

            
            setSensoryPanelChart(data)
            setTasteIntensityChart(dataTasteIntensity)
            
            console.log(data)
        }

    }
  /*   useEffect(() => {
        console.log("tasteIntensityChart>>>>>>>>>", tasteIntensityChart)
    }, [tasteIntensityChart]) */

    console.log("sensoryPanelChart>>>>>>>>>", sensoryPanelChart)
    console.log("protocolsKeys>>>>>>>>>", protocolsKeys)

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

            {sensoryPanelChart.length > 0 && <SensoryChart title="Taste" keys={protocolsKeys} data={sensoryPanelChart} />}
            {tasteIntensityChart.length > 0  && <SensoryChart title="Aroma Intensity" keys={protocolsKeys}  data={tasteIntensityChart} />}
        </List>
    );
}

export default Charts;