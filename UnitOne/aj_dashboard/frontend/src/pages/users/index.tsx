import useBreadcrumb from "../../common/hooks/breadcrumbs";
import {columns , tableActions} from './partials/table'
import ListActions from '../../components/stack-actions'
import {actions} from './partials/actions'
import AppTable from "../../components/table";
import {useNavigator} from "../../common/routes";
import {Button, IconButton} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {MouseEventHandler} from "react";


const rows = [
    {
        id:1,
        name: 'Ali',
        email: 'ali@hotmail.com'
    },
    {
        id:2,
        name: 'Ali',
        email: 'ali@hotmail.com'
    },
    {
        id:3,
        name: 'Ali',
        email: 'ali@hotmail.com'
    },
    {
        id:4,
        name: 'Ali',
        email: 'ali@hotmail.com'
    },
    {
        id:5,
        name: 'Ali',
        email: 'ali@hotmail.com'
    },
    {
        id:6,
        name: 'Ali',
        email: 'ali@hotmail.com'
    }
];
const Projects:React.FC = () => {
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
            label: 'Users',
            path: "/users"
        }])

    return (
        <>
            <ListActions actions={_actions}/>
            <AppTable columns={columns} rows={rows} actions={tableActions} />
        </>
    );
}

export default Projects;
