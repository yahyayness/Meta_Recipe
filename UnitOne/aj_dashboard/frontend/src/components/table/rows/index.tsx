import {TableBody, TableCell} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import React from "react";
import Checkbox from "@mui/material/Checkbox";

const TableRows: React.FC<TableRowProps> = ({rows, columns, actions ,setSelectedRows }) => {

    /**
     * this one is used for publishing the selected ids
     * @param event
     * @param row
     * @author Amr
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> , row:any) => {
        if(event.target.checked)
            setSelectedRows( (selectedIds:[]) => [...selectedIds , row])
        else
            setSelectedRows( (selectedIds:[]) => selectedIds.filter((_row:any )=> _row?.id != row.id))
    };

    return (
        <TableBody>
            {rows.map((row: any, index: number) => (
                <TableRow
                    key={'table-' + index}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell align="center">
                        <Checkbox color="primary"   onChange={(event)=> handleChange(event , row)}/>
                    </TableCell>
                    {
                        columns.map((column: TableColumns, columnIndex: number) => column.isHidden ? '' : column.component ? React.createElement(column.component, {data: row}) :
                            <TableCell key={`table-${columnIndex}-row-` + index}
                                       align="center">{row[column.value]}</TableCell>)
                    }

                    <TableCell align="center">{
                        actions?.map((action: TableActionType, actionIndex: number) => React.cloneElement(action?.component, {
                            data: row,
                            key: `table-${index}-action-${actionIndex}`
                        }))
                    }</TableCell>

                </TableRow>
            ))}
        </TableBody>
    );
}

export default TableRows;