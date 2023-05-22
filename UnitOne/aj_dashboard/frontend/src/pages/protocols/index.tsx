import {useNavigator} from "../../common/routes";
import {actions} from "../projects/partials/actions";
import useBreadcrumb from "../../common/hooks/breadcrumbs";
import ListActions from "../../components/stack-actions";
import AppTable from "../../components/table";
import {columns, tableActions} from "../projects/partials/table";

const rows = [
    {
        id:1,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id:2,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id:3,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id:4,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id:5,
        name: 'protocol',
        date: '10-10-2023'
    },
    {
        id:6,
        name: 'protocol',
        date: '10-10-2023'
    }
];
const Protocol:React.FC = ()=>{
    /**
     * common hook that controls all navigations
     * @author Amr
     */
    const { navigator }= useNavigator();
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
            label: 'Protocols',
            path: "/protocols"
        }])

    return (
        <>
            <ListActions actions={_actions}/>
            <AppTable columns={columns} rows={rows} actions={tableActions} />
        </>
    );
}

export default Protocol;