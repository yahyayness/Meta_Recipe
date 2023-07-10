import Grid from "@mui/material/Grid";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveRadar} from "@nivo/radar";
import React from "react";

const Enose:React.FC<any> = ({data, keys, colors})=>{

    const custom = keys.map((item: string, index: number) => ({id: item, label: item, color: colors[index]}));

    return (
        <Grid item xs={3}>
            <Card className='chart-card'>
                <CardHeader
                    className='chart-card-header'
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title="Enose "
                />

                <CardContent className='chart-card-content'>
                    <ResponsiveRadar

                        data={data}
                        keys={keys}
                        indexBy="taste"
                        valueFormat=" >-.2f"
                        margin={{top: 30, right: 40, bottom: 60, left: 40}}
                        borderColor={{from: 'color'}}
                        gridLevels={7}
                        gridShape="linear"
                        gridLabelOffset={5}
                        dotSize={9}
                        dotColor={{theme: 'background'}}
                        dotBorderWidth={3}
                        dotLabelYOffset={-13}
                        colors={({
                            key,
                            index
                          }) => {
                            return colors[index];
                        }}
                        blendMode="multiply"
                        motionConfig="wobbly"
                        fillOpacity={0}
                        legends={[
                            {
                                anchor: 'bottom-left',
                                direction: 'column',
                                translateX: -40,
                                translateY: -40,
                                itemWidth: 80,
                                itemHeight: 20,
                                itemTextColor: '#999',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ],
                                data: custom
                            }
                        ]}
                    />
                </CardContent>
            </Card>
        </Grid>
    );

}

export default Enose;