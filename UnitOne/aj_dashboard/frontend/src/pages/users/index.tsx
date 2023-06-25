import { tableActions, useUserTable} from './partials/table'
import ListActions from '../../components/stack-actions'
import AppTable from "../../components/table";
import {Pagination, Stack} from "@mui/material";
import AppPagination from "../../components/table/pagination";
import AppDialog from "../../components/dialog/index";

const Users:React.FC = () => {

   const {rows, request, showAlert, columns, commonActions , setRefresh,navigator ,pagination, setSelectedRows, showDeleteConfirmation,setShowDeleteConfirmation,deleteUsers} =  useUserTable()

    return (
        <>
            <AppDialog title="Confirmation" message="Are you sure that you want to delete this Users?" open={showDeleteConfirmation} setOpen={setShowDeleteConfirmation} ok={()=>deleteUsers()}/>
            <ListActions actions={commonActions}/>
            <AppTable columns={columns} rows={rows} actions={tableActions(navigator , request,showAlert , setRefresh)} pagination={pagination} onRowSelect={setSelectedRows}/>
        </>
    );
}

export default Users;
