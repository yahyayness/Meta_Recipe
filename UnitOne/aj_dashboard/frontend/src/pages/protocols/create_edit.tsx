import React, {useCallback, useEffect, useState} from 'react';
import ReactFlow, {addEdge, applyEdgeChanges, applyNodeChanges, Node, Edge, ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';
import './partials/style.scss'
import IngredientGroup from './components/ingredient/index';
import {Container, Divider, ListItem, Stack} from "@mui/material";
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

const rfStyle = {
    backgroundColor: 'trasparent',
};


// we define the nodeTypes outside of the component to prevent re-renderings
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

    const {_actions , nodes , edges,onNodesChange,onEdgesChange, onConnect , addProtocol ,counter}
        = useProtocol();

    //
    // const [nodes, setNodes] = useState<Array<Node>>([]);
    // const [edges, setEdges] = useState<Array<Edge>>([]);
    // const [counter, setCounter] = useState<number>(0)
    //
    //
    // const findNode = (id: string | undefined) => {
    //     return nodes.find((node: Node) => node.id == id)
    // }
    //
    // /**
    //  * set the breadcrumbs of the current page
    //  * @author Amr
    //  */
    // useBreadcrumb([
    //     {
    //         label: 'Protocols',
    //         path: "/protocols"
    //     },
    //     {
    //         label: '230201-v01 Vegan Croissant',
    //         path: "/protocols/create",
    //         isCurrent: true
    //     }
    // ])
    //
    // const addIngredient = useCallback((parentId: string) => {
    //     setNodes((nodes: Array<Node>) => {
    //         let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
    //         const updatedNodes = [...nodes]
    //         const nextId = parentId + '-' + Math.random();
    //         updatedNodes[parentIndex].data =
    //             {
    //                 ...updatedNodes[parentIndex].data,
    //                 children: [...(updatedNodes[parentIndex].data.children ?? []),
    //                     {
    //                         id: nextId,
    //                         type: 'Ingredient',
    //                         data: {type: 'target'},
    //                     },
    //                 ]
    //             };
    //         return updatedNodes;
    //     })
    // }, [setNodes])
    // const addProcessChild = useCallback((parentId: string) => {
    //     setNodes((nodes: Array<Node>) => {
    //         let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
    //         const updatedNodes = [...nodes]
    //         const nextId = parentId + '-' + (updatedNodes[parentIndex]?.data?.children?.length) + 1
    //         updatedNodes[parentIndex].data =
    //             {
    //                 ...updatedNodes[parentIndex].data,
    //                 children: [...(updatedNodes[parentIndex].data.children ?? []),
    //                     {
    //                         ...updatedNodes[parentIndex]?.data?.children[0],
    //                         id: nextId,
    //                     },
    //                 ]
    //             };
    //         return updatedNodes;
    //     })
    // }, [setNodes])
    //
    // const onNodesChange = useCallback(
    //     (changes: any) => {
    //         setNodes((nds) => applyNodeChanges(changes, nds))
    //     },
    //     [setNodes]
    // );
    // const onEdgesChange = useCallback(
    //     (changes: any) => {
    //         setEdges((eds) => applyEdgeChanges(changes, eds))
    //     },
    //     []
    // );
    // const onConnect = useCallback(
    //     (connection: any) => {
    //         setEdges((eds) => addEdge(connection, eds))
    //     },
    //     []
    // );
    //
    // const addProtocol = (type: any) => {
    //     const action = addNode(type.protocol?.toLowerCase());
    //     action(type);
    //
    // }
    //
    // const random = (max: number) => Math.floor(Math.random() * max) + 1
    //
    // /**
    //  * this method updates the value of children in the nodes list according to the
    //  * incoming value from child's component
    //  * @author Amr
    //  */
    // const onChildChange = useCallback((parentId: string, childIndex: string, value: any) => {
    //     setNodes((nodes: Array<Node>) => {
    //         // find parent according to the passed parentId
    //         let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
    //         // clone nodes, so we can update the reference of nodes
    //         const updatedNodes = [...nodes]
    //         let childrenIndex = updatedNodes[parentIndex].data.children?.findIndex((node: Node) => node.id == childIndex)
    //         updatedNodes[parentIndex].data.children[childrenIndex].data = {
    //             ...updatedNodes[parentIndex].data.children[childrenIndex].data,
    //             value
    //         }
    //         return updatedNodes;
    //     })
    // }, [setNodes])
    //
    //
    // const addIngredientProtocol = (process: any = {}) => {
    //     const id = 'ingredient-' + (nodes?.length + 1);
    //     setNodes(nodes => [...nodes, {
    //         id: id,
    //         type: 'ingredient-container',
    //         position: {x: 10, y: 1},
    //         draggable: true,
    //         height: 100,
    //         data: {
    //             value: 123,
    //             addAction: () => addIngredient(id),
    //             onChange: onChildChange,
    //             children: [],
    //             ...process
    //         }
    //     }
    //     ])
    // }
    //
    // const addMerge = (process: any = {}) => {
    //     const id = 'merge-' + (random(100));
    //     setNodes(nodes => [...nodes, {
    //         id: id,
    //         type: 'merge',
    //         position: {x: 10, y: 1},
    //         draggable: true,
    //         height: 100,
    //         data: {
    //             addAction: () => addIngredient(id),
    //             children: [],
    //         }
    //     }
    //     ])
    // }
    //
    // const addServe = (process: any = {}) => {
    //     const id = 'serve-' + (random(100));
    //     setNodes(nodes => [...nodes, {
    //         id: id,
    //         type: 'serve',
    //         position: {x: 10, y: 1},
    //         draggable: true,
    //         height: 100,
    //         data: {
    //             addAction: () => addIngredient(id),
    //             children: [],
    //         }
    //     }
    //     ])
    // }
    //
    // const addChild = (type:string) => {
    //     const actions:any = {
    //         serve: addServe,
    //         process: addProcess,
    //         ingredient: addIngredientProtocol,
    //         merge: addMerge
    //     }
    //     return actions[type] as Function
    // }
    //
    // /**
    //  * remove node from nodes and from edges
    //  * @param id
    //  * @author Amr
    //  */
    // const onClose = (id: string) => {
    //     setNodes((nodes: Array<Node>) => nodes.filter((node: Node) => node.id != id))
    //     setEdges((edges: Array<Edge>) => edges.filter((edge: Edge) => edge.source != id || edge.target != id))
    // }
    //
    //
    // const addProcess = (process: any = {}) => {
    //     const id = 'process-' + (nodes?.length + 1);
    //     setNodes(nodes => [...nodes, {
    //         id: id,
    //         type: 'process',
    //         position: {x: 10, y: 1},
    //         draggable: true,
    //         height: 100,
    //         data: {
    //             addAction: addProcessChild,
    //             onChange: onChildChange,
    //             onClose,
    //             children: process.inputs?.map((input: any, index: number) => {
    //                 const childId = `process-${id}-${index}`
    //                 return {
    //                     id: childId,
    //                     type: input.type,
    //                     position: {x: 10, y: 1},
    //                     draggable: true,
    //                     height: 100,
    //                     props: input.props,
    //                     data: {}
    //                 }
    //             }),
    //             ...process
    //         }
    //     }
    //     ])
    // }
    // /**
    //  * this one is used to add node to the flow board
    //  * @param type
    //  * @author Amr
    //  */
    // const addNode = (type: string): any => {
    //     const actions: NodeActions = {
    //         ingredient: addIngredientProtocol,
    //         merge: addMerge,
    //         serve: addServe,
    //         process: addProcess
    //     }
    //     return actions[type] as Function
    // }
    // /**
    //  * page's common actions
    //  * @author Amr
    //  */
    // const _actions = actions(navigator)

    return (
        <>
            <ListActions actions={_actions}/>
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