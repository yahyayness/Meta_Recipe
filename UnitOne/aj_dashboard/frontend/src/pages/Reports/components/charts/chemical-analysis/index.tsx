import Grid from "@mui/material/Grid";
import {Card, CardContent, CardHeader, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

const ChemicalAnalysis:React.FC = ()=> {
    return (      <Grid item xs={5}>
        <Card className='chart-card' style={{ opacity: 0.4, pointerEvents: 'none' }}>
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

                <table className='chemical-analysis'>
                    <thead>
                    <tr>
                        <th>P1</th>
                        <th>P2</th>
                        <th>P3</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>0.950</td>
                        <td className='red-cell'>0.950</td>
                        <td>0.950</td>
                        <td>Trans alpha</td>
                    </tr>
                    <tr>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td className='red-cell'>0.950</td>
                        <td>Trans alpha</td>
                    </tr>
                    <tr>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td className='red-cell'>0.950</td>
                        <td>Trans alpha</td>
                    </tr>
                    <tr>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td className='red-cell'>0.950</td>
                        <td>Trans alpha</td>
                    </tr>
                    <tr>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td className='red-cell'>0.950</td>
                        <td>Trans alpha</td>
                    </tr>
                    <tr>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td className='red-cell'>0.950</td>
                        <td>Trans alpha</td>
                    </tr>
                    <tr>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td>Trans alpha</td>
                    </tr>
                    <tr>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td>0.950</td>
                        <td>Trans alpha</td>
                    </tr>


                    </tbody>

                </table>

            </CardContent>
        </Card>
    </Grid>);
}

export default ChemicalAnalysis;