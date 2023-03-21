import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";


function convertTitles(titlesArr) {
    let newTitlesArr = []
    for (const title of titlesArr) {
        if (title.startsWith("land_use")) {
            newTitlesArr = [...newTitlesArr, "Land use"];
        } else if (title.startsWith("fresh")) {
            newTitlesArr = [...newTitlesArr, "Freshwater(10L)"];
        } else {
            newTitlesArr = [...newTitlesArr, title.replace(/^\w/, (c) => c.toUpperCase())];
        }
    }
    return newTitlesArr;
}

export default function LineByData({ dynamicEnvImpact, envImpactAvg , suggestedMax }) {

    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const chart = () => {

            let datasetLand = []
            // save data set
            datasetLand = [{
                label: "Dish Footprint",
                backgroundColor: '#f2b705',
                // borderWidth: 4,
                data: Object.values(dynamicEnvImpact)
            }];


            // save data set
            datasetLand = [...datasetLand, {
                label: "Metarecipe Avarge",
                backgroundColor: '#2f1544',
                // borderWidth: 4,
                data: Object.values(envImpactAvg)
            }];


            // datasetLand = [ ...datasetLand , {
            //     label: "Ghg",
            //     backgroundColor: colors[3],
            //     borderWidth: 4,
            //     data: Object.values(props.ghg_avg)
            // }];

            setChartData({
                labels: convertTitles(Object.keys(dynamicEnvImpact)),
                datasets: datasetLand
            });
        }


        chart();
    }, [dynamicEnvImpact , envImpactAvg]);

    return (
        <div>
            <Bar
                data={chartData}
                // width={60}
                // height={20}   
                options={{
                    responsive: true,
                    aspectRatio: 3,
                    title: { text: "Environmental Impact", display: false },
                    legend: {
                        position: 'bottom',
                        // align: 'start'

                    },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: '#2f1544',
                                lineWidth: 0.5
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                suggestedMax: suggestedMax,
                                min: 0
                            }
                        }],
                    }

                }}
            />
        </div>
    );
};
