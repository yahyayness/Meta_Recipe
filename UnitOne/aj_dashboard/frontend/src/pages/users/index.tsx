import { tableActions, useUserTable} from './partials/table'
import ListActions from '../../components/stack-actions'
import AppTable from "../../components/table";

const Users:React.FC = () => {

   const {rows, request, showAlert, columns, _actions , setRefresh,navigator} =  useUserTable()

    return (
        <>
            <ListActions actions={_actions}/>
            <AppTable columns={columns} rows={rows} actions={tableActions(navigator , request,showAlert , setRefresh)} />
        </>
    );
}

export default Users;
