import DeleteAction from "../../../components/actions/delete";
import EditAction from "../../../components/actions/edit";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {UserType} from "../../../types/ModelTypes";
import {AlertTypes} from "../../../types/Enums";
import {useHttp} from "../../../plugins/axios";
import {useEffect, useState} from "react";
import {useAlert} from "../../../common/hooks/alert";
import {useNavigator} from "../../../common/routes";
import {actions} from "./actions";
import useBreadcrumb from "../../../common/hooks/breadcrumbs";


export const tableActions = (navigator: any, request: any, showAlert: any, setRefresh: any) => [
    {
        component: <DeleteAction onClick={(row: any) => {
            request(addParamsToEndpoint(getEndpoint('delete_user'), {id: row.id})).then(() => {
                setRefresh((refresh: number) => refresh + 1)
                showAlert({
                    type: AlertTypes.SUCCESS,
                    message: `User ${row.first_name + ' ' + row.last_name} deleted successfully`
                });
            })
            return '';
        }
        }/>
    },
    {
        component: <EditAction onClick={(row: any) => {
            navigator('/users/' + row.id)
            return '';
        }
        }/>
    }

];

export const columns = [
    {
        label: 'id',
        value: 'id',
        isHidden: true
    },
    {
        label: 'First name',
        value: 'first_name',
    },
    {
        label: 'Last name',
        value: 'last_name',
    },
    {
        label: 'Username',
        value: 'username',
    },
    {
        label: 'Email',
        value: 'email',
    }
] as Array<TableColumns>

export const useUserTable = () => {

    const {request} = useHttp();
    const [rows, setRows] = useState<Array<UserType>>([])
    const {showAlert} = useAlert()
    const [refresh, setRefresh] = useState(0)
    /**
     * common hook that controls all navigations
     * @author Amr
     */
    const {navigator} = useNavigator();
    /**
     * page's common actions
     * @author Amr
     */
    const _actions = actions(navigator)
    /**
     * set the breadcrumbs of the current page
     * @author Amr
     */
    useBreadcrumb([
        {
            label: 'Users',
            path: "/users"
        }])
    /**
     * fetch all user from the backend
     * @author Amr
     */
    const fetch = () => {
        request<Array<UserType>>(getEndpoint('all_users')).then(response => setRows(response.data.payload))
    }
    /**
     * update the data according to the refresh flag
     */
    useEffect(() => fetch(), [refresh])

    return {rows, request, showAlert, columns, _actions , setRefresh,navigator}


}

