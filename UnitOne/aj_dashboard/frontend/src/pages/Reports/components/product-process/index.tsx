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
import AppTable from "../../../../components/table";
import {tableActions} from "../../../users/partials/table";

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

const ProductProcess: React.FC<any> = ({ processData }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log('value' , value)
        setValue(newValue);
    };

    return (
        <Grid container spacing={3} mt={1}>
            <Grid item xs={8}>
                <Card style={{ opacity: 0.4, pointerEvents: 'none' }}>

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
                            {value === 1 && (
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
                            {value === 2 && (
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

                        <div
                            role="tabpanel"
                            hidden={value !== 1}
                            id={`simple-tabpanel-${1}`}
                            aria-labelledby={`simple-tab-${1}`}

                        >

                            {value === 1 && (
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

                        <div
                            role="tabpanel"
                            hidden={value !== 2}
                            id={`simple-tabpanel-${2}`}
                            aria-labelledby={`simple-tab-${2}`}

                        >

                            {value === 2 && (
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
                <Card className='chart-card  report-process-table' >

                    <CardContent className='chart-card-content report-process-table'>
                        <AppTable columns={ [
                            {
                                label: 'id',
                                value: 'id',
                                isHidden: true
                            },
                            {
                                label: 'Process',
                                value: 'process',
                            },
                            {
                                label: 'P1',
                                value: 'p1',
                            },
                            {
                                label: 'P2',
                                value: 'p2',
                            },
                            {
                                label: 'P3',
                                value: 'p3',
                            }
                        ] as Array<TableColumns>} rows={processData} actions={[]} pagination={{}} showStaticColumn={false} />
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    );
}

export default ProductProcess;