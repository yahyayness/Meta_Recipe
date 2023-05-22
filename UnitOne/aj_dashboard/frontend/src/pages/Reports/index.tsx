import {Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton} from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TimelineDot from '@mui/lab/TimelineDot';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './partials/style.scss'
import ReportStatistics from "./components/statistics";
import Avatar from "@mui/material/Avatar";
import {ExpandMore} from "@mui/icons-material";
import React from "react";

import { ResponsiveRadar } from '@nivo/radar'


const data = [
    {
        "taste": "fruity",
        "p1": 107,
        "p2": 110,
        "p3": 113
    },
    {
        "taste": "bitter",
        "p1": 96,
        "p2": 61,
        "p3": 80
    },
    {
        "taste": "heavy",
        "p1": 86,
        "p2": 23,
        "p3": 69
    },
    {
        "taste": "strong",
        "p1": 74,
        "p2": 39,
        "p3": 110
    },
    {
        "taste": "sunny",
        "p1": 115,
        "p2": 77,
        "p3": 108
    }
]

const secondData = [
    {
        "taste": "E0",
        "p1": 107,
        "p2": 110,
        "p3": 113
    },
    {
        "taste": "E1",
        "p1": 96,
        "p2": 61,
        "p3": 80
    },
    {
        "taste": "E2",
        "p1": 86,
        "p2": 23,
        "p3": 69
    },
    {
        "taste": "E3",
        "p1": 74,
        "p2": 39,
        "p3": 110
    },
    {
        "taste": "E4",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E5",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E6",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E7",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E8",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E9",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E10",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E11",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E12",
        "p1": 115,
        "p2": 77,
        "p3": 108
    },
    {
        "taste": "E13",
        "p1": 115,
        "p2": 77,
        "p3": 108
    }

]



const Report: React.FC = () => {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box>
           <ReportStatistics/>
            <Grid container spacing={3} className='chart-container' mt={1}>
                <Grid item xs={3}>
                    <Card className='chart-card'>
                        <CardHeader
                            className='chart-card-header'
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Panel sensory data "
                        />

                        <CardContent   className='chart-card-content' >
                            <ResponsiveRadar

                                data={data}
                                keys={[ 'p1', 'p2', 'p3' ]}
                                indexBy="taste"
                                valueFormat=" >-.2f"
                                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                                borderColor={{ from: 'color' }}
                                gridLevels={7}
                                gridShape="linear"
                                gridLabelOffset={20}
                                dotSize={4}
                                dotColor={{ from: 'color', modifiers: [] }}
                                dotBorderWidth={3}
                                dotLabelYOffset={-13}
                                colors={{ scheme: 'nivo' }}
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
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
                <Grid item xs={3}>
                    <Card className='chart-card'>
                        <CardHeader
                            className='chart-card-header'
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title="Panel sensory data "
                        />

                        <CardContent   className='chart-card-content' >
                            <ResponsiveRadar

                                data={secondData}
                                keys={[ 'p1', 'p2', 'p3' ]}
                                indexBy="taste"
                                valueFormat=" >-.2f"
                                margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
                                borderColor={{ from: 'color' }}
                                gridLevels={7}
                                gridShape="linear"
                                gridLabelOffset={20}
                                dotSize={9}
                                dotColor={{ theme: 'background' }}
                                dotBorderWidth={3}
                                dotLabelYOffset={-13}
                                colors={{ scheme: 'nivo' }}
                                blendMode="multiply"
                                motionConfig="wobbly"
                                fillOpacity={0}
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
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card className='chart-card'>
                        <CardHeader
                            className='chart-card-header'
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }


                            title="Emouth"

                        />

                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                This impressive paella is a perfect party dish and a fun meal to cook
                                together with your guests. Add 1 cup of frozen peas along with the mussels,
                                if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton aria-label="share">
                                <ShareIcon />
                            </IconButton>
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                                    aside for 10 minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                                    stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and
                                    peppers, and cook without stirring, until most of the liquid is absorbed,
                                    15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
                                    mussels, tucking them down into the rice, and cook again without
                                    stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don&apos;t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Report;