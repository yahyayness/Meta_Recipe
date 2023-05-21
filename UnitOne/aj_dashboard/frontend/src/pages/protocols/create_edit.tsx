import React, {useCallback, useEffect, useState} from 'react';
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Node, Edge, ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';
import './partials/style.scss'
import IngredientGroup from './components/ingredient/index';
import {Button, Container, Divider, ListItem, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import useBreadcrumb from "../../common/hooks/breadcrumbs";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Ingredient from './components/ingredient-row/index'
import IngredientRow from "./components/ingredient-row/index";
import Merge from "./components/merge";
import Serve from "./components/serve";
import ProtocolsOptions from "./components/protocols";
import Process from "./components/process";
import {number} from "yup";
import ListActions from "../../components/stack-actions";
import {actions} from './partials/actions'
import useProtocol from "./partials/hooks";
import {addParamsToEndpoint, getEndpoint} from "../../common/http";
import {ProtocolType} from "../../types/ModelTypes";
import {useAlert} from "../../common/hooks/alert";
import {useNavigator} from "../../common/routes";
import {useParams} from "react-router-dom";
import {useHttp} from "../../plugins/axios";

const rfStyle = {
    backgroundColor: 'trasparent',
};


// we define the nodeTypes outside the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
    Ingredient,
    'ingredient-container': IngredientGroup,
    'ingredient': IngredientRow,
    merge: Merge,
    serve: Serve,
    process: Process
};

const EXTRA_HEIGHT = 55;

const CreateEditProtocol: React.FC = () => {

    const { onSave , onDuplicate, nodes , edges,onNodesChange,onEdgesChange, onConnect , addProtocol ,counter}
        = useProtocol();
    return (
        <>
            <Stack spacing={2} direction="row"  justifyContent="right" className="list-master-actions">
                <Button  variant="text" color="info" onClick={onDuplicate}>Duplicate</Button>
                <Button  variant="text" color="info" onClick={onSave}>Save</Button>

            </Stack>
            <Stack flexDirection='row'>

                <Box width="100%" style={{height: '70ch'}} key={'nodes-' + counter}>
                    <ReactFlow

                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        nodeTypes={nodeTypes}
                        // fitView
                        style={rfStyle}
                    />
                </Box>
                <ProtocolsOptions addProtocol={addProtocol}/>

            </Stack>
        </>



    );
}

export default CreateEditProtocol;