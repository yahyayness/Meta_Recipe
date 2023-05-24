import Grid from "@mui/material/Grid";
import React from "react";
import {Box, Card, CardContent, CardHeader, IconButton, Tabs , Tab} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {ResponsiveRadar} from "@nivo/radar";
import Typography from "@mui/material/Typography";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: ' #F9FAFC;',
        color: theme.palette.common.black,
        fontWeight: theme.typography?.fontWeightBold
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ProductProcess: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Grid container spacing={3} mt={1}>
            <Grid item xs={8}>
                <Card>

                    <CardContent className='chart-card-content product-card'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Product by taste " />
                                <Tab label="Product by smell"  />
                                <Tab label="Product by sensor" />
                            </Tabs>
                        </Box>
                        <div
                            role="tabpanel"
                            hidden={value !== 0}
                            id={`simple-tabpanel-${0}`}
                            aria-labelledby={`simple-tab-${0}`}

                        >
                            {value === 0 && (
                                <Box>

                                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                                                <StyledTableCell align="right">Calories</StyledTableCell>
                                                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                                                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                                                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {rows.map((row) => (
                                                <StyledTableRow key={row.name}>
                                                    <StyledTableCell component="th" scope="row">
                                                        {row.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </Box>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card className='chart-card'>

                    <CardContent className='chart-card-content'>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Item One" />
                                <Tab label="Item Two"  />
                                <Tab label="Item Three" />
                            </Tabs>
                        </Box>
                        <div
                            role="tabpanel"
                            hidden={value !== 0}
                            id={`simple-tabpanel-${0}`}
                            aria-labelledby={`simple-tab-${0}`}

                        >
                            {value === 0 && (
                                <Box sx={{ p: 3 }}>
                                    <Typography>Tab1</Typography>
                                </Box>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    );
}

export default ProductProcess;