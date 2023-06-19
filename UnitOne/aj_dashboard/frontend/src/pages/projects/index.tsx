import {tableActions, useProjectTable} from './partials/table'
import ListActions from '../../components/stack-actions'
import AppTable from "../../components/table";
import AppDialog from "../../components/dialog/index";


const Projects:React.FC = () => {
    const {rows, request, showAlert, columns, commonActions , setRefresh,navigator ,pagination,setSelectedRows,refresh,showDeleteConfirmation,setShowDeleteConfirmation,deleteProjects} =  useProjectTable()
    return (
        <>
            <AppDialog title="Confirmation" message="Are you sure that you want to delete this projects?" open={showDeleteConfirmation} setOpen={setShowDeleteConfirmation} ok={()=>deleteProjects()}/>
            <ListActions actions={commonActions}/>
            <AppTable columns={columns} rows={rows} key={refresh} actions={tableActions(navigator , request,showAlert , setRefresh)} pagination={pagination} onRowSelect={setSelectedRows} />
        </>
    )
}

export default Projects;
