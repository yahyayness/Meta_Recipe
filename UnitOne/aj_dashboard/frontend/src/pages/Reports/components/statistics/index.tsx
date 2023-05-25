import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TimelineDot from "@mui/lab/TimelineDot";

const ReportStatistics:React.FC = ()=>{

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper elevation={0} className='report-statistic common-legends'>
                    <Typography variant="h5">
                        R230201-v01
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        <Typography variant="subtitle1" color="textSecondary">
                            <div className='legend-container'>
                                <div className='legend-item-container'>
                                    <div><TimelineDot className='legend' style={{backgroundColor:'#FF6F67'}} /></div>
                                    <div>Target- Butter Croissant - v000</div>
                                </div>
                                <div className='legend-item-container'>
                                    <div><TimelineDot className='legend' style={{backgroundColor:'#FFAF68'}} /></div>
                                    <div>Vegan Croissant - v011</div>
                                </div>
                                <div className='legend-item-container'>
                                    <div><TimelineDot className='legend' style={{backgroundColor:'#66B2FE'}} /></div>
                                    <div>Vegan Croissant - v012</div>
                                </div>
                            </div>



                        </Typography>
                    </Typography>

                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper variant="outlined" className='report-statistic'>
                    <Typography variant="h5">
                        0.24 sec
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Digitization time
                    </Typography>

                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper variant="outlined" className='report-statistic'>
                    <Typography variant="h5">
                        60+
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Panelists
                    </Typography>

                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper variant="outlined" className='report-statistic'>
                    <Typography variant="h5">
                        3
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        Potential comparable items in Database
                    </Typography>

                </Paper>
            </Grid>
        </Grid>
    );
}
export default ReportStatistics;