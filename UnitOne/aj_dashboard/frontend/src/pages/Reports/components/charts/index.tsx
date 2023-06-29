import Grid from "@mui/material/Grid";
import {Card, CardActions, CardContent, CardHeader, Collapse, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveRadar} from "@nivo/radar";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import React, { useEffect } from "react";
import PersonalSensory from "./panel-sensory";
import Emouth from "./Emouth";
import Enose from "./Enose";
import {ResponsiveBullet} from "@nivo/bullet";
import RecipeAnalysis from "./recipe-analysis";
import ChemicalAnalysis from "./chemical-analysis";
import { useChartsData } from "../../partials/charts";

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

const emouthData = [
    {
        "id": "japan",
        "color": "hsl(218, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 150
            },
            {
                "x": "helicopter",
                "y": 199
            },
            {
                "x": "boat",
                "y": 293
            },
            {
                "x": "train",
                "y": 237
            },
            {
                "x": "subway",
                "y": 165
            },
            {
                "x": "bus",
                "y": 75
            },
            {
                "x": "car",
                "y": 259
            },
            {
                "x": "moto",
                "y": 12
            },
            {
                "x": "bicycle",
                "y": 17
            },
            {
                "x": "horse",
                "y": 55
            },
            {
                "x": "skateboard",
                "y": 38
            },
            {
                "x": "others",
                "y": 129
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(163, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 10
            },
            {
                "x": "helicopter",
                "y": 70
            },
            {
                "x": "boat",
                "y": 18
            },
            {
                "x": "train",
                "y": 183
            },
            {
                "x": "subway",
                "y": 61
            },
            {
                "x": "bus",
                "y": 21
            },
            {
                "x": "car",
                "y": 56
            },
            {
                "x": "moto",
                "y": 95
            },
            {
                "x": "bicycle",
                "y": 49
            },
            {
                "x": "horse",
                "y": 73
            },
            {
                "x": "skateboard",
                "y": 184
            },
            {
                "x": "others",
                "y": 110
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(21, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 73
            },
            {
                "x": "helicopter",
                "y": 196
            },
            {
                "x": "boat",
                "y": 268
            },
            {
                "x": "train",
                "y": 283
            },
            {
                "x": "subway",
                "y": 163
            },
            {
                "x": "bus",
                "y": 0
            },
            {
                "x": "car",
                "y": 100
            },
            {
                "x": "moto",
                "y": 165
            },
            {
                "x": "bicycle",
                "y": 57
            },
            {
                "x": "horse",
                "y": 276
            },
            {
                "x": "skateboard",
                "y": 108
            },
            {
                "x": "others",
                "y": 241
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(193, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 20
            },
            {
                "x": "helicopter",
                "y": 292
            },
            {
                "x": "boat",
                "y": 146
            },
            {
                "x": "train",
                "y": 13
            },
            {
                "x": "subway",
                "y": 1
            },
            {
                "x": "bus",
                "y": 7
            },
            {
                "x": "car",
                "y": 114
            },
            {
                "x": "moto",
                "y": 246
            },
            {
                "x": "bicycle",
                "y": 145
            },
            {
                "x": "horse",
                "y": 274
            },
            {
                "x": "skateboard",
                "y": 231
            },
            {
                "x": "others",
                "y": 179
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(280, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 213
            },
            {
                "x": "helicopter",
                "y": 14
            },
            {
                "x": "boat",
                "y": 43
            },
            {
                "x": "train",
                "y": 291
            },
            {
                "x": "subway",
                "y": 125
            },
            {
                "x": "bus",
                "y": 86
            },
            {
                "x": "car",
                "y": 261
            },
            {
                "x": "moto",
                "y": 88
            },
            {
                "x": "bicycle",
                "y": 271
            },
            {
                "x": "horse",
                "y": 57
            },
            {
                "x": "skateboard",
                "y": 232
            },
            {
                "x": "others",
                "y": 215
            }
        ]
    }
]

const ReportCharts = ({ chartData, emouthData, keys, colors }: { chartData: any[], emouthData: any[], keys: string[], colors: string[]}) => {
    return (
        <>
            <Grid container spacing={3} className='chart-container' mt={1}>
                <PersonalSensory data={chartData} keys={keys} colors={colors} />
                <Enose data={chartData} keys={keys} colors={colors} />
                <Emouth data={emouthData} colors={colors} />
            </Grid>
            <Grid container spacing={2} mt={1}>
                <RecipeAnalysis data={barData}/>
                <ChemicalAnalysis/>
            </Grid>
        </>

    );
}

export default ReportCharts;