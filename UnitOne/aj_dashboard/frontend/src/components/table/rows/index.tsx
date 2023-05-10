import {TableBody, TableCell} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import React from "react";

const TableRows:React.FC<TableRowProps> = ({rows , columns, actions})=>{
    return (
        <TableBody>
            {rows.map((row:any, index:number) => (
                <TableRow
                    key={'table-'+index}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell align="center">{index+1}</TableCell>
                    {
                        columns.map((column:TableColumns , columnIndex:number) => column.isHidden? '' : column.component? React.createElement(column.component , {data: row}):  <TableCell key={`table-${columnIndex}-row-`+index} align="center">{row[column.value]}</TableCell> )
                    }

                    <TableCell align="center">{
                        actions?.map((action:TableActionType , actionIndex:number) => React.cloneElement(action?.component , {data:row , key:`table-${index}-action-${actionIndex}`}))
                    }</TableCell>

                </TableRow>
            ))}
        </TableBody>
    );
}

export default TableRows;