import { useHttp } from "../../../plugins/axios"
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ListType, ProjectType, ProtocolType} from "../../../types/ModelTypes";
import { useEffect, useState } from "react";


export const useChartsData = () => {
    const { request } = useHttp();

    const [project, setProject] = useState<ProjectType|null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [panelists, setPanelists] = useState<number>(0);
    const [chartData, setChartData] = useState<any[]>([]);
    const [emouthData, setEmouthData] = useState<any[]>([]);
    const [processData, setProcessData] = useState<any[]>([]);

    /**
     * fetch all project and protocols data from backend
     * 
     */
    const fetch = async () => {
        let start = new Date().getTime();
        try {
            const projectResponse = await request<ListType<ProjectType>>(getEndpoint('all_projects'));
            const _projects = projectResponse.data.payload?.results;
            setProject(_projects[0]);

            formChartData(_projects[0]);
            
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
    const formChartData = (project: ProjectType) => {
        const data: any = [];
        const emouth: any = [];
        const processes: any = [{
            process: "Preheat Oven (°C)"
        }, {
            process: "Bake (minutes)"
        }];
        let pIndex = 0;

        console.log('PROJECt', project);

        //TODO: key chart keys from here

        let {protocols}: any = project;
        protocols = protocols.slice(0, 3);

        let _panelists = 0;
        if (project.sensory_panels) {
            _panelists = project.sensory_panels.filter((value, index, array) => array.indexOf(value) === index).length;
        };

        for (let protocol of protocols) {
            const {sensory_panel}:any = protocol.extra;

            

            if (!sensory_panel) continue;
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
            emouth.unshift(emouthData);

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


            /**
             * processes data
             * 
             */
            const _processes = protocol.processes;
            for (let process of _processes) {
                let index = process.name === 'preheat_oven' ? 0 : process.name === 'bake' ? 1 : -1; 

                if (index < 0) continue;
                if (process.name === 'preheat_oven') {
                    processes[0]['p' + (pIndex + 1)] = process.arguments.temperature.value;
                }

                if (process.name === 'bake') {
                    processes[1]['p' + (pIndex + 1)] = process.arguments.duration.value;
                }
            }

            if (!_processes.some((p: any) => p.name === 'bake')) {
                processes[1]['p' + (pIndex + 1)] = 'N/A';
            }

            if (!_processes.some((p: any) => p.name === 'preheat_oven')) {
                processes[0]['p' + (pIndex + 1)] = 'N/A';
            }

            pIndex++;
        }
        setChartData(data);
        setEmouthData(emouth);
        setPanelists(_panelists);
        setProcessData(processes);
    }

    useEffect(() => {
        fetch();
    }, [])

    return {
        project,
        duration,
        panelists,
        chartData,
        emouthData,
        processData
    }
}

const colors = [
    '#FF6F67',
    '#FFAF68',
    '#66B2FE'
]