import useBreadcrumb from "../../common/hooks/breadcrumbs";
import {columns, tableActions, useProjectTable} from './partials/table'
import ListActions from '../../components/stack-actions'
import {actions} from './partials/actions'
import AppTable from "../../components/table";
import {useNavigator} from "../../common/routes";
import {Button, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {MouseEventHandler} from "react";
import {useUserTable} from "../users/partials/table";

const Projects:React.FC = () => {


    const {rows, request, showAlert, columns, commonActions , setRefresh,navigator ,pagination,setSelectedRows} =  useProjectTable()

    return (
        <>
            <ListActions actions={commonActions}/>
            <AppTable columns={columns} rows={rows} actions={tableActions(navigator , request,showAlert , setRefresh)} pagination={pagination} onRowSelect={setSelectedRows} />
        </>
    );
}

export default Projects;
