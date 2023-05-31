import {tableActions, useProjectTable} from './partials/table'
import ListActions from '../../components/stack-actions'
import AppTable from "../../components/table";


const Projects:React.FC = () => {
    const {rows, request, showAlert, columns, commonActions , setRefresh,navigator ,pagination,setSelectedRows,refresh} =  useProjectTable()
    return (
        <>
            <ListActions actions={commonActions}/>
            <AppTable columns={columns} rows={rows} key={refresh} actions={tableActions(navigator , request,showAlert , setRefresh)} pagination={pagination} onRowSelect={setSelectedRows} />
        </>
    );
}

export default Projects;
