import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TimelineDot from "@mui/lab/TimelineDot";
import { ProjectType, ProtocolType } from "../../../../types/ModelTypes";

const ReportStatistics = ({ 
    selectedProject,
    selectedProtocols,
    duration,
    colors
}: { 
    selectedProject: ProjectType,
    selectedProtocols: string[],
    duration: number,
    colors: string[]
})=>{

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper elevation={0} className='report-statistic common-legends'>
                    <Typography variant="h5">
                        {selectedProject?.name}
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                        <Typography variant="subtitle1" color="textSecondary">
                            <div className='legend-container'>
                                {selectedProtocols.map((protocol, index) => (
                                    <div className='legend-item-container'>
                                        <div><TimelineDot className='legend' style={{backgroundColor: colors[index]}} /></div>
                                        <div>{protocol}</div>
                                    </div>
                                ))}
                            </div>
                        </Typography>
                    </Typography>

                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper variant="outlined" className='report-statistic'>
                    <Typography variant="h5">
                        {Math.round(duration / 10) / 100} sec
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
                        {selectedProtocols.length}
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