import Grid from "@mui/material/Grid";
import {Stack} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveRadar} from "@nivo/radar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";
import DesiredSensors from './desired'
import AchievableSensors from './achievable'
 

const ReportSensors: React.FC = () => {
    return (
        <Stack spacing={2} mt={5}>
            <DesiredSensors/>
            <AchievableSensors/>
        </Stack>

    );
}

export default ReportSensors;