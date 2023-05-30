import {useNavigator} from "../../common/routes";
import {actions} from "./partials/actions";
import useBreadcrumb from "../../common/hooks/breadcrumbs";
import ListActions from "../../components/stack-actions";
import AppTable from "../../components/table";
import {tableActions} from "./partials/table";
import {useEffect, useState} from "react";
import {useProtocolTable} from "./partials/table";

const rows = [
    {
        id: 1,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id: 2,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id: 3,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id: 4,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id: 5,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id: 6,
        name: 'protocol',
        date: '10-10-2023'
    }
];
const Protocol: React.FC = () => {
    const {rows, request, showAlert, columns, commonActions , setRefresh,navigator ,pagination,setSelectedRows,refresh} =  useProtocolTable()
    return (
        <>
            <ListActions actions={commonActions}/>
            <AppTable columns={columns} rows={rows} key={refresh} actions={tableActions(navigator , request,showAlert , setRefresh)} pagination={pagination} onRowSelect={setSelectedRows}/>
        </>
    );
}

export default Protocol;