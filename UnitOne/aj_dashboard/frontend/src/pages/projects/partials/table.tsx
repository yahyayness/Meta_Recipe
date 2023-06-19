import DeleteAction from "../../../components/actions/delete";
import EditAction from "../../../components/actions/edit";
import {useHttp} from "../../../plugins/axios";
import {useCallback, useEffect, useState} from "react";
import {ListType, ProjectType, ProtocolType, UserType} from "../../../types/ModelTypes";
import {useAlert} from "../../../common/hooks/alert";
import {useSearchParams} from "react-router-dom";
import {useNavigator} from "../../../common/routes";
import {actions} from "../../projects/partials/actions";
import useBreadcrumb from "../../../common/hooks/breadcrumbs";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {AlertTypes} from "../../../types/Enums";
import GeneralAction from "../../../components/actions/general";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
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
    },
    {
        component: <GeneralAction tooltip='Create a new Protocol' icon={AccountTreeIcon} onClick={(row: any) => {
            navigator(`/protocols/${row.id}/create`)
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
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const handeShowDeleteDialog = ()=> setShowDeleteConfirmation(true)
    /**
     * common hook that controls all navigations
     * @author Amr
     */
    const {navigator} = useNavigator();

    /**
     * delete's Projects actions
     * @author Bilal
     */
    const deleteProjects =()=>{
        console.log('selectedRows' , selectedRows)
        request<ListType<ProtocolType>>(getEndpoint('delete_projects'), {ids : selectedRows?.map( (row:ProtocolType) => row.id)} ).then(response => {
            fetch(searchParams.get('page'))
            showAlert({
                type: AlertTypes.SUCCESS,
                message: `Protocols Deleted successfully`
            })
        })
    }



    /**
     * page's common actions
     * @author Amr
     */
    const [commonActions , setCommonActions] = useState([])

     

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
            setSelectedRows([])
        })
    }

    useEffect(()=>{
        setCommonActions(actions(navigator, ((_selectedRows:any)=>{
            request<ListType<ProjectType>>(getEndpoint('clone_project'), {ids :  selectedRows.map((row:any) => row?.id)}).then(response => {
                showAlert({
                    type: AlertTypes.SUCCESS,
                    message: `Project cloned successfully`
                })
                fetch(searchParams.get('page'))
                setRefresh((refresh:any) => refresh +1)
            })
        }),handeShowDeleteDialog) as []);
    } , [selectedRows])


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
        selectedRows,
        refresh,
        showDeleteConfirmation,
        setShowDeleteConfirmation,
        deleteProjects
        
    }


}

