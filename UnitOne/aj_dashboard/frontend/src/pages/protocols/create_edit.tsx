import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges,Node ,Edge} from 'reactflow';
import 'reactflow/dist/style.css';
import './partials/style.scss' +
    ''
import TextUpdaterNode from './components/ingredient/index';
import {Container, ListItem, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import useBreadcrumb from "../../common/hooks/breadcrumbs";

const rfStyle = {
    backgroundColor: 'trasparent',
};

const initialNodes = [
    { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
    {
        id: 'node-2',
        type: 'output',
        targetPosition: 'top',
        position: { x: 0, y: 200 },
        data: { label: 'node 2' },
    },
    {
        id: 'node-3',
        type: 'output',
        targetPosition: 'top',
        position: { x: 200, y: 200 },
        data: { label: 'node 3' },
    },
] as Array<Node>;

const initialEdges = [
    { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
    { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
]as Array<Edge>;

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

const CreateEditProtocol:React.FC = ()=> {
    /**
     * set the breadcrumbs of the current page
     * @author Amr
     */
    useBreadcrumb([
        {
            label: 'Protocols',
            path: "/protocols"
        },
        {
            label: '230201-v01 Vegan Croissant',
            path: "/protocols/create",
            isCurrent: true
        }
    ])
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes:any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection:any) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
        <Stack flexDirection='row'>
            <Box mx={0} width="100%" style={{height : '70ch'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    style={rfStyle}
                />
            </Box>
            <Box width='20%'  className="protocols-items">
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

        </Stack>


    );
}

export default CreateEditProtocol;