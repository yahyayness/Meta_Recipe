import Grid from "@mui/material/Grid";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveBullet} from "@nivo/bullet";
import React from "react";

const RecipeAnalysis:React.FC<any> = ({data})=> {
    return (
        <Grid item xs={7}>
            <Card className='chart-card' style={{ opacity: 0.4 }}>
                <CardHeader
                    className='chart-card-header'
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title="Recipe analysis"
                />

                <CardContent className='chart-card-content'>
                    <ResponsiveBullet
                        data={data}
                        minValue={1}
                        margin={{top: 50, right: 90, bottom: 50, left: 90}}
                        spacing={42}
                        titleAlign="start"
                        titleOffsetX={-70}
                        rangeBorderColor={{from: 'color', modifiers: []}}
                        measureBorderColor={{from: 'color', modifiers: []}}
                        measureSize={1}
                        markerSize={0}
                        measureColors="seq:blue_green"

                        motionConfig={{
                            mass: 1,
                            tension: 170,
                            friction: 15,
                            clamp: false,
                            precision: 0.01,
                            velocity: 0
                        }}
                    />
                </CardContent>
            </Card>
        </Grid>
    );
}
export default RecipeAnalysis;