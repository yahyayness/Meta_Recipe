import DeleteAction from "../../../components/actions/delete";
import EditAction from "../../../components/actions/edit";
import {useHttp} from "../../../plugins/axios";
import {useCallback, useEffect, useState} from "react";
import {ListType, ProjectType, UserType} from "../../../types/ModelTypes";
import {useAlert} from "../../../common/hooks/alert";
import {useSearchParams} from "react-router-dom";
import {useNavigator} from "../../../common/routes";
import {actions} from "../../projects/partials/actions";
import useBreadcrumb from "../../../common/hooks/breadcrumbs";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {AlertTypes} from "../../../types/Enums";


export const tableActions = (navigator: any, request: any, showAlert: any, setRefresh: any) => [
    {
        component: <DeleteAction onClick={(row: any) => {
            request(addParamsToEndpoint(getEndpoint('delete_project'), {id: row.id})).then(() => {
                setRefresh((refresh: number) => refresh + 1)
                showAlert({
                    type: AlertTypes.SUCCESS,
                    message: `Project ${row.name} deleted successfully`
                });
            })
            return '';
        }
        }/>
    },
    {
        component: <EditAction onClick={(row: any) => {
            navigator('/projects/' + row.id)
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
        label: 'Description',
        value: 'description',
    },
    {
        label: 'Date',
        value: 'date',
    }
] as Array<TableColumns>


export const useProjectTable = () => {

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
            label: 'Projects',
            path: "/projects"
        }])
    /**
     * fetch all user from the backend
     * @author Amr
     */
    const fetch = (page: string | null) => {
        request<ListType<ProjectType>>(getEndpoint('all_projects'), {params: {page: page ?? 1}}).then(response => {
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

