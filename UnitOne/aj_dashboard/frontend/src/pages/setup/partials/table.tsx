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
            request(addParamsToEndpoint(getEndpoint('delete_setup'), {id: row.id})).then(() => {
                setRefresh((refresh: number) => refresh + 1)
                showAlert({
                    type: AlertTypes.SUCCESS,
                    message: `Setup  deleted successfully`
                });
            })
            return '';
        }
        }/>
    },
    {
        component: <EditAction onClick={(row: any) => {
            navigator('/setup/' + row.id)
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
        label: 'Level of operations',
        value: 'operation_level',
    },
    {
        label: 'Cuisine Requirements Profile',
        value: 'cuisine_requirement_profile',
    },
    {
        label: 'Culinary Cultural Profile',
        value: 'culinary_cultural_profile',
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
       request<ListType<UserType>>(getEndpoint('delete_setup'), {ids : selectedRows?.map( (row:UserType) => row.id)} ).then(response => {
           fetch(searchParams.get('page'))
           showAlert({
               type: AlertTypes.SUCCESS,
               message: `Setup Deleted successfully`
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
            label: 'setup',
            path: "/setup"
        }])
    /**
     * fetch all user from the backend
     * @author Amr
     */
    const fetch = (page:string | null) => {
        request<ListType<UserType>>(getEndpoint('all_setups') , { params : {page: page?? 1} }).then(response => {
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

