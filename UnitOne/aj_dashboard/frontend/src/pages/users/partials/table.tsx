import DeleteAction from "../../../components/actions/delete";
import EditAction from "../../../components/actions/edit";


export const tableActions = [
    {
        component: <DeleteAction onClick={(row:any) => {
           console.log('row'  ,row)
            return '';
        }
        }/>
    },
    {
        component: <EditAction onClick={(row:any) => {
            console.log('row'  ,row)
            return '';
        }
        }/>
    }

];

export const columns =  [
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
        label: 'Email',
        value: 'email',
    }
] as Array<TableColumns>

