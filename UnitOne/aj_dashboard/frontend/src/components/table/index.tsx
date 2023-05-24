import {Table, TableContainer} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHeader from "./header";
import TableRows from "./rows";
import AppPagination from "./pagination";
import {useEffect, useState} from "react";

const AppTable: React.FC<TableTypeProps> = ({columns, rows, actions , pagination  , onRowSelect = ()=>{}}) => {
    const [selectedRows ,setSelectedRows] = useState([])
    useEffect(()=>{
        onRowSelect(selectedRows)
    } , [selectedRows])
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHeader columns={columns} actions={actions}/>
                    <TableRows columns={columns} rows={rows} actions={actions} setSelectedRows={setSelectedRows}/>
                </Table>

            </TableContainer>
            <AppPagination pages={pagination?.num_pages ?? 1}/>
        </>
    );
}

export default AppTable;