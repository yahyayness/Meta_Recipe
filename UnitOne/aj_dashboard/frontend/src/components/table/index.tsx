import {Table, TableContainer} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableHeader from "./header";
import TableRows from "./rows";

const AppTable:React.FC<TableTypeProps> = ({columns , rows , actions})=>{
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHeader columns={columns} actions={actions}/>
                <TableRows columns={columns} rows={rows} actions={actions}/>
            </Table>
        </TableContainer>
    );
}

export default AppTable;