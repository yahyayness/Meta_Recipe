import Grid from "@mui/material/Grid";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveRadar} from "@nivo/radar";
import React from "react";

const PersonalSensory:React.FC<any> = ({data})=>{
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
                    title="Panel sensory data "
                />

                <CardContent className='chart-card-content'>
                    <ResponsiveRadar

                        data={data}
                        keys={['p1', 'p2', 'p3']}
                        indexBy="taste"
                        valueFormat=" >-.2f"
                        margin={{top: 70, right: 80, bottom: 40, left: 80}}
                        borderColor={{from: 'color'}}
                        gridLevels={7}
                        gridShape="linear"
                        gridLabelOffset={20}
                        dotSize={4}
                        dotColor={{from: 'color', modifiers: []}}
                        dotBorderWidth={3}
                        dotLabelYOffset={-13}
                        colors={{scheme: 'nivo'}}
                        blendMode="multiply"
                        motionConfig="wobbly"
                        legends={[
                            {
                                anchor: 'bottom',
                                direction: 'row',
                                translateX: -70,
                                translateY: -70,
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
                                ]
                            }
                        ]}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default PersonalSensory;