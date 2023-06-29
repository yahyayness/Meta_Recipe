import { useHttp } from "../../../plugins/axios"
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ListType, ProjectType, ProtocolType} from "../../../types/ModelTypes";
import { useEffect, useState } from "react";


export const useChartsData = () => {
    const { request } = useHttp();

    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [protocols, setProtocols] = useState<ProtocolType[]>([]);
    const [duration, setDuration] = useState<number>(0);
    const [chartData, setChartData] = useState<any[]>([]);
    const [emouthData, setEmouthData] = useState<any[]>([]);

    /**
     * fetch all project and protocols data from backend
     * 
     */
    const fetch = async () => {
        let start = new Date().getTime();
        try {
            const projectResponse = await request<ListType<ProjectType>>(getEndpoint('all_projects'));
            const _projects = projectResponse.data.payload?.results;
            setProjects(_projects);

            const protocolResponse = await request<ListType<ProtocolType>>(getEndpoint('all_protocols'));
            const _protocols = protocolResponse.data.payload?.results;
            setProtocols(_protocols);

            formChartData(_protocols, _projects);
            
        } catch (error) {
            throw error
        } finally {
            let end = new Date().getTime();
            setDuration(end - start);
        }
    }

    /**
     * convert project and protocol data to chart data
     * 
     */
    const formChartData = (protocols: ProtocolType[], projects: ProjectType[]) => {
        const data: any = [];
        const emouth: any = [];
        let pIndex = 0;

        protocols = protocols.filter(p => p.project === projects[0].id);

        for (let protocol of protocols) {
            const {sensory_panel}:any = protocol.extra;

            /**
             * line graph data
             * 
             */
            let emouthData = {
                "id": protocol.name,
                "color": colors[pIndex],
                "data": sensory_panel.map((item: any) => ({
                    "x": item.variable,
                    "y": item.value,
                }))
            };
            emouth.push(emouthData);

            /**
             * rotational graph data
             * 
             */
            for (let sensor of sensory_panel) {
                let index = data.findIndex((data: any) => data["taste"] === sensor.variable)

                if (index > -1) {
                    data[index][protocol.name] = sensor.value;
                } else {
                    data.push({
                        "taste": sensor.variable,
                        [protocol.name]: sensor.value
                    });
                }

                
            }
            pIndex++;
        }

        setChartData(data);
        setEmouthData(emouth);
    }

    useEffect(() => {
        fetch();
    }, [])

    return {
        projects,
        protocols,
        duration,
        chartData,
        emouthData
    }
}

const colors = [
    '#FF6F67',
    '#FFAF68',
    '#66B2FE'
]