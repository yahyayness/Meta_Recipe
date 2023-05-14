import { tableActions, useUserTable} from './partials/table'
import ListActions from '../../components/stack-actions'
import AppTable from "../../components/table";
import {Pagination, Stack} from "@mui/material";
import AppPagination from "../../components/table/pagination";

const Users:React.FC = () => {

   const {rows, request, showAlert, columns, _actions , setRefresh,navigator ,pagination} =  useUserTable()

    return (
        <>
            <ListActions actions={_actions}/>
            <AppTable columns={columns} rows={rows} actions={tableActions(navigator , request,showAlert , setRefresh)} pagination={pagination}/>
        </>
    );
}

export default Users;
