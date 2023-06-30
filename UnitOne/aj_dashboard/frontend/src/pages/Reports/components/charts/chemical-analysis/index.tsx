import Grid from "@mui/material/Grid";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";

const ChemicalAnalysis:React.FC = ()=> {

    return (      <Grid item xs={5}>
        <Card className='chart-card'>
            <CardHeader
                className='chart-card-header'
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon/>
                    </IconButton>
                }
                title="Chemical analysis"
            />

            <CardContent className='chart-card-content'>

            <ResponsiveBar
                data={data}
                keys={[
                    'hot dog',
                    'burger',
                ]}
                indexBy="country"
                margin={{ top: 10, right: 60, bottom: 70, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({
                    id,
                    data
                  }: {id: any, data: any}) => String(data[`${id}Color`])}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'country',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                axisRight={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'food',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                enableLabel={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 0,
                        translateY: 70,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 10,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                groupMode="grouped"
            />

            </CardContent>
        </Card>
    </Grid>);
}

export default ChemicalAnalysis;

const data = [
    {
      "country": "AD",
      "hot dog": 75,
      "hot dogColor": 'rgb(42, 159, 222)',
      "burger": 21,
      "burgerColor": "rgb(26, 214, 176)",
    },
    {
      "country": "AE",
      "hot dog": 21,
      "hot dogColor": 'rgb(42, 159, 222)',
      "burger": 151,
      "burgerColor": "rgb(26, 214, 176)",
    },
    {
      "country": "AF",
      "hot dog": 180,
      "hot dogColor": 'rgb(42, 159, 222)',
      "burger": 4,
      "burgerColor": "rgb(26, 214, 176)",
    },
    {
      "country": "AG",
      "hot dog": 72,
      "hot dogColor": 'rgb(42, 159, 222)',
      "burger": 197,
      "burgerColor": "rgb(26, 214, 176)",
    },
    {
      "country": "AI",
      "hot dog": 162,
      "hot dogColor": 'rgb(42, 159, 222)',
      "burger": 190,
      "burgerColor": "rgb(26, 214, 176)",
    },
    {
      "country": "AL",
      "hot dog": 83,
      "hot dogColor": 'rgb(42, 159, 222)',
      "burger": 90,
      "burgerColor": "rgb(26, 214, 176)",
    },
    {
      "country": "AM",
      "hot dog": 106,
      "hot dogColor": 'rgb(42, 159, 222)',
      "burger": 188,
      "burgerColor": "rgb(26, 214, 176)",
    }
  ]