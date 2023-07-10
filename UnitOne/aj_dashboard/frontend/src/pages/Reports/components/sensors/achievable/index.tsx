import Grid from "@mui/material/Grid";
import { Card, CardContent, CardHeader, IconButton, Stack, Typography, FormControlLabel, Switch } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { styled } from '@mui/material/styles';
import { marks, SensorSlider } from '../partials/customSlider'
const AchievableSensors: React.FC = () => {



  function Title() {
    return (
      <div>
        Achievable
        <FormControlLabel
          value="Fruity"
          control={<Switch size="small" color="primary" />}
          label={<Typography className="achievable-switcher-title"> {">Match mode"} </Typography>}
          labelPlacement="start"
        />
      </div>
    );
  }

  return (<Grid item xs={5}>
    <Card className='chart-card'>
      <CardHeader
        className='chart-card-header'
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Title />}
      >
        sadasds
      </CardHeader>

      <CardContent className='sensors-card-content'>

        <Stack sx={{ height: 140 }} spacing={12} direction="row">
          <Stack spacing={2}  >
            <SensorSlider
              track={false}
              aria-label="ios slider"
              defaultValue={60}
              marks={marks}
              orientation="vertical"
              step={.5} min={0} max={10}
              valueLabelDisplay="on"
            />
            <FormControlLabel
              value="bottom"
              control={<Switch size="small" color="primary" />}
              sx={{
                fontSize: 8
              }}
              label="Fruity"
              labelPlacement="bottom"
            />
          </Stack>
        </Stack>

      </CardContent>
    </Card>
  </Grid>);
}

export default AchievableSensors;