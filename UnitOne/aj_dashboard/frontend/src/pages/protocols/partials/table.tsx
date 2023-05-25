import DeleteAction from "../../../components/actions/delete";
import EditAction from "../../../components/actions/edit";
import {useHttp} from "../../../plugins/axios";
import {useCallback, useEffect, useState} from "react";
import {ListType, ProjectType, UserType} from "../../../types/ModelTypes";
import {useAlert} from "../../../common/hooks/alert";
import {useSearchParams} from "react-router-dom";
import {useNavigator} from "../../../common/routes";
import {actions} from "./actions";
import useBreadcrumb from "../../../common/hooks/breadcrumbs";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {AlertTypes} from "../../../types/Enums";


export const tableActions = (navigator: any, request: any, showAlert: any, setRefresh: any) => [
    {
        component: <DeleteAction onClick={(row: any) => {
            request(addParamsToEndpoint(getEndpoint('delete_protocol'), {id: row.id})).then(() => {
                setRefresh((refresh: number) => refresh + 1)
                showAlert({
                    type: AlertTypes.SUCCESS,
                    message: `Protocol ${row.name} deleted successfully`
                });
            })
            return '';
        }
        }/>
    },
    {
        component: <EditAction onClick={(row: any) => {
            console.log('row_id' , row.id)
            navigator('/protocols/' + row.id)
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
        label: 'name',
        value: 'name',
    },

    {
        label: 'Date',
        value: 'created_at',
    }
] as Array<TableColumns>


export const useProtocolTable = () => {

    const {request} = useHttp();
    const [rows, setRows] = useState<Array<ProjectType>>([])
    const {showAlert} = useAlert()
    const [refresh, setRefresh] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagination, setPagination] = useState<PaginationType>({} as PaginationType)
    const [selectedRows, setSelectedRows] = useState([])
    /**
     * common hook that controls all navigations
     * @author Amr
     */
    const {navigator} = useNavigator();
    /**
     * page's common actions
     * @author Amr
     */
    const [commonActions , setCommonActions] = useState([])

    useEffect(()=>{
        setCommonActions(actions(navigator, ((_selectedRows:any)=>{
            console.log('selectedRowsssssss' , selectedRows )
        })) as []);
    } , [selectedRows])


    /**
     * set the breadcrumbs of the current page
     * @author Amr
     */
    useBreadcrumb([
        {
            label: 'Protocols',
            path: "/protocols"
        }])
    /**
     * fetch all user from the backend
     * @author Amr
     */
    const fetch = (page: string | null) => {
        request<ListType<ProjectType>>(getEndpoint('all_protocols'), {params: {page: page ?? 1}}).then(response => {
            setRows(response.data.payload?.results)
            setPagination(response.data.payload as PaginationType)
        })
    }
    /**
     * update the data according to the refresh flag
     */
    useEffect(() => fetch(searchParams.get('page')), [refresh, searchParams.get('page')])

    return {
        rows,
        request,
        showAlert,
        columns,
        commonActions,
        setRefresh,
        navigator,
        pagination,
        setSelectedRows,
        selectedRows
    }


}

