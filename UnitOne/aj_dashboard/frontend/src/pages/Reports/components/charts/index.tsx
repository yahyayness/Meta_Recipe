import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, Collapse, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveRadar} from "@nivo/radar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";
import PersonalSensory from "./panel-sensory";
import Emouth from "./Emouth";
import Enose from "./Enose";
import {ResponsiveBullet} from "@nivo/bullet";
import RecipeAnalysis from "./recipe-analysis";
import ChemicalAnalysis from "./chemical-analysis";

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

const barData = [
    {
        "id": "temp.",
        "ranges": [
            2,
            73,
            14,
            0,
            120
        ],
        "measures": [
            61
        ],
        "markers": [
            106
        ]
    },
    {
        "id": "power",
        "ranges": [
            0.20888204031012148,
            1.1444875437060535,
            0.42812705615041935,
            0,
            2
        ],
        "measures": [
            0.3507309687165055,
            1.8594172996433231
        ],
        "markers": [
            1.261142807396343
        ]
    },
    {
        "id": "volume",
        "ranges": [
            11,
            27,
            19,
            27,
            3,
            30,
            0,
            60
        ],
        "measures": [
            1
        ],
        "markers": [
            53
        ]
    },
    {
        "id": "cost",
        "ranges": [
            31028,
            26900,
            460827,
            0,
            500000
        ],
        "measures": [
            55077,
            179188
        ],
        "markers": [
            357350
        ]
    },
    {
        "id": "revenue",
        "ranges": [
            1,
            2,
            2,
            0,
            11
        ],
        "measures": [
            0
        ],
        "markers": [
            8.002022984472033,
            6.887815784981754
        ]
    }
]

const ReportCharts: React.FC = () => {
    return (
        <>
            <Grid container spacing={3} className='chart-container' mt={1}>
                <PersonalSensory data={data}/>
                <Enose data={secondData}/>
                <Emouth data={secondData}/>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <RecipeAnalysis data={barData}/>
                <ChemicalAnalysis/>
            </Grid>
        </>

    );
}

export default ReportCharts;