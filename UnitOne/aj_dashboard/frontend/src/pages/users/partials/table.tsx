import DeleteAction from "../../../components/actions/delete";
import EditAction from "../../../components/actions/edit";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ListType, UserType} from "../../../types/ModelTypes";
import {AlertTypes} from "../../../types/Enums";
import {useHttp} from "../../../plugins/axios";
import {useEffect, useState} from "react";
import {useAlert} from "../../../common/hooks/alert";
import {useNavigator} from "../../../common/routes";
import {actions} from "./actions";
import useBreadcrumb from "../../../common/hooks/breadcrumbs";
import {useSearchParams} from "react-router-dom";


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
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagination ,setPagination] = useState<PaginationType>({} as PaginationType)
    const [selectedRows, setSelectedRows] = useState([])
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const handeShowDeleteDialog = ()=> setShowDeleteConfirmation(true)
    /**
     * common hook that controls all navigations
     * @author Amr
     */
    const {navigator} = useNavigator();
   
    

    const [commonActions , setCommonActions] = useState([])

    /**
    * delete's Protocols actions
    * @author Bilal
    */
   const deleteUsers =()=>{
       console.log('selectedRows' , selectedRows)
       request<ListType<UserType>>(getEndpoint('delete_users'), {ids : selectedRows?.map( (row:UserType) => row.id)} ).then(response => {
           fetch(searchParams.get('page'))
           showAlert({
               type: AlertTypes.SUCCESS,
               message: `Protocols Deleted successfully`
           })
       })  
   }  
 
   /**
     * page's common actions
     * @author Bilal
     */
   useEffect(()=>{
       setCommonActions(actions(navigator,handeShowDeleteDialog) as []);
   } , [selectedRows])

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
    const fetch = (page:string | null) => {
        request<ListType<UserType>>(getEndpoint('all_users') , { params : {page: page?? 1} }).then(response => {
            setRows(response.data.payload?.results)
            setPagination(response.data.payload as PaginationType)
        })
    }
    /**
     * update the data according to the refresh flag
     */
    useEffect(() => fetch(searchParams.get('page')), [refresh , searchParams.get('page')])

    return {rows, request, showAlert, columns, setSelectedRows, commonActions , setRefresh,navigator ,
        pagination, showDeleteConfirmation,setShowDeleteConfirmation,deleteUsers}


}

