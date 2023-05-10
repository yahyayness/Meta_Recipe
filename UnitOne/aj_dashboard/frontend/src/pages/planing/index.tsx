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
        name: 'product',
        date: '10-10-2023'
    },
    {
        id:2,
        name: 'product',
        date: '10-10-2023'
    },
    {
        id:3,
        name: 'product',
        date: '10-10-2023'
    },
    {
        id:4,
        name: 'product',
        date: '10-10-2023'
    },
    {
        id:5,
        name: 'product',
        date: '10-10-2023'
    },
    {
        id:6,
        name: 'product',
        date: '10-10-2023'
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
            label: 'Projects',
            path: "/projects"
        }])

    return (
        <>
            <ListActions actions={_actions}/>
            <AppTable columns={columns} rows={rows} actions={tableActions} />
        </>
    );
}

export default Projects;
