import React, { useState, useEffect } from "react";
import { Radar, defaults } from "react-chartjs-2";



defaults.global.defaultFontFamily = "'Baloo Tamma 2'";
defaults.global.defaultFontColor = '#2f1544'
defaults.global.defaultFontStyle = 'bold'
// defaults.global.defaultFontStyle =  '20'



export default function RadarByData(props) {

    const [chartData, setChartData] = useState({});


    // to do make sure about order
    // const colors = ['#f2b705'];

    useEffect(() => {
        const chart = () => {


            let datasets = [];
            // let aromaLabel = aroma.entity_alias_readable;
            // pick color
            let data_color = '#f2b705';


            // save data set
            datasets = [{
                // label: "dd",
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: data_color,
                borderWidth: 2,
                data: Object.values(props.data),
                pointRadius: 1.5

            }];



            setChartData({
                labels: Object.keys(props.data),
                datasets: datasets
            });
        }


        chart();
    }, [props]);

    return (
        <div>
            <Radar
                data={chartData}
                width={100}
                height={100}
                color='green'
                options={{
                    responsive: true,
                    aspectRatio: 1,

                    title: { text: props.title, display: false },
                    legend: {
                        display: false,
                    },
                    scale: {
                        gridLines: {
                            color: '#2f1544',
                            lineWidth: 0.5
                        },
                        angleLines: {
                            color: '#2f1544',
                            lineWidth: 0.5

                        },
                        ticks: {
                            min: 0,
                            suggestedMax: props.suggestedMax
                        }
                    }
                }}
            />
        </div>
    );
};
