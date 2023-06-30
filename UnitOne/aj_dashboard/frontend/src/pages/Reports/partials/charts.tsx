import { useHttp } from "../../../plugins/axios"
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ListType, ProjectType, ProtocolType} from "../../../types/ModelTypes";
import { useEffect, useState } from "react";


export const useChartsData = () => {
    const { request } = useHttp();

    const [project, setProject] = useState<ProjectType|null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [panelists, setPanelists] = useState<number>(0);
    const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
    const [chartData, setChartData] = useState<any[]>([]);
    const [emouthData, setEmouthData] = useState<any[]>([]);
    const [processData, setProcessData] = useState<any[]>([]);
    const [recipeData, setRecipeData] = useState<any[]>([]);

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
            process: "Baking (minutes)"
        }];
        let recipeAnalysis: any = [];
        let pIndex = 0;

        console.log('PROJECT', project);

        let {protocols}: any = project;
        protocols = protocols.slice(0, 3);
        setSelectedProtocols(protocols.map((p: any) => p.name));

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
             * recipe analysis data
             * 
             */
            const ingredients = protocol.ingredients;
            for (let ing of ingredients) {
                let index = recipeAnalysis.findIndex((data: any) => data["id"] === ing.ingredient_id)

                if (index > -1) {
                    recipeAnalysis[index]['p' + (pIndex + 1)] = ing.quantity;
                    recipeAnalysis[index].total = recipeAnalysis[index].total + ing.quantity;
                } else {
                    recipeAnalysis.push({
                        name: ing.name,
                        id: ing.ingredient_id,
                        ['p' + (pIndex + 1)]: ing.quantity,
                        total: ing.quantity
                    });
                }
            }

            /**
             * processes data
             * 
             */
            const _processes = protocol.processes;
            for (let process of _processes) {
                let index = process.name === 'Preheat Oven' ? 0 : process.name === 'Baking' ? 1 : -1; 

                if (index < 0) continue;
                if (process.name === 'Preheat Oven') {
                    processes[0]['p' + (pIndex + 1)] = process.arguments.temperature.value;
                }

                if (process.name === 'Baking') {
                    processes[1]['p' + (pIndex + 1)] = process.arguments.duration.value;
                }
            }

            if (!_processes.some((p: any) => p.name === 'Baking')) {
                processes[1]['p' + (pIndex + 1)] = 'N/A';
            }

            if (!_processes.some((p: any) => p.name === 'Preheat Oven')) {
                processes[0]['p' + (pIndex + 1)] = 'N/A';
            }

            pIndex++;
        }

        let _recipeData = recipeAnalysis.sort((acc: any, cur: any) => cur.total - acc.total).slice(0, 5)
                .map((item: any) => ({ 
                    id: item.name, 
                    markers: [0],
                    measures: [0],
                    ranges: [ 
                        item.p1, 
                        item.p1 + item.p2, 
                        item.p1 + item.p2 + item.p3, 
                        0, 
                        item.total 
                    ]
                }));

        setChartData(data);
        setEmouthData(emouth);
        setPanelists(_panelists);
        setProcessData(processes);
        setRecipeData(_recipeData);
    }

    useEffect(() => {
        fetch();
    }, [])

    return {
        project,
        selectedProtocols,
        duration,
        panelists,
        chartData,
        emouthData,
        processData,
        recipeData
    }
}

const colors = [
    '#FF6F67',
    '#FFAF68',
    '#66B2FE'
]