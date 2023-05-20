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

const rfStyle = {
    backgroundColor: 'trasparent',
};


// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {Ingredient, 'ingredient-container': IngredientGroup, 'ingredient': IngredientRow, merge: Merge , serve:Serve , process:Process};

const EXTRA_HEIGHT = 55;

const CreateEditProtocol: React.FC = () => {


    const [nodes, setNodes] = useState<Array<Node>>([]);
    const [edges, setEdges] = useState<Array<Edge>>([]);
    const [counter, setCounter] = useState<number>(0)

    const [ingredientChildrenCounter, setIngredientChildrenCounter] = useState<number>(1)

    const findNode = (id: string | undefined) => {
        return nodes.find((node: Node) => node.id == id)
    }

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

    const addIngredient = useCallback((parentId: string) => {
        setNodes((nodes: Array<Node>) => {
            let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
            const updatedNodes = [...nodes]
            const nextId = parentId + '-' + Math.random();
            updatedNodes[parentIndex].data =
                {
                    ...updatedNodes[parentIndex].data,
                    children: [...(updatedNodes[parentIndex].data.children ?? []),
                        {
                            id: nextId,
                            type: 'Ingredient',
                            data: {label: 'child node 1', type: 'target'},
                        },
                    ]
                };
            return updatedNodes;
        })
    }, [setNodes])
    const addProcessChild = useCallback((parentId: string) => {
        setNodes((nodes: Array<Node>) => {
            let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
            const updatedNodes = [...nodes]
            const nextId = parentId + '-' +(updatedNodes[parentIndex]?.data?.children?.length) +1
            updatedNodes[parentIndex].data =
                {
                    ...updatedNodes[parentIndex].data,
                    children: [...(updatedNodes[parentIndex].data.children ?? []),
                        {
                            ...updatedNodes[parentIndex]?.data?.children[0],
                            id: nextId,
                        },
                    ]
                };
            return updatedNodes;
        })
    }, [setNodes])

    // const addIngredient = (parentId: string) => {
    //     setNodes((nodes:Array<Node>) => {
    //        let parentIndex =  nodes?.findIndex((node:Node) => node.id == parentId)
    //         const updatedNodes = [...nodes]
    //         const nextId = parentId+'-'+ (updatedNodes[parentIndex].data.children && []).length;
    //         updatedNodes[parentIndex].data.children = [...(updatedNodes[parentIndex].data.children??[])   ,
    //             {
    //                 id: nextId,
    //                 type: 'Ingredient',
    //                 data: {label: 'child node 1' ,  type: 'target'},
    //             },
    //         ];
    //        return updatedNodes;
    //     })
    //
    //     setCounter(counter => counter ++)
    //     // const parentNode = findNode(parentId)
    //     // if(parentNode)
    //     //      parentNode.data.children = [... parentNode.data.children  ,  {
    //     //     id: parentId+'-'+nodes?.length,
    //     //     type: 'Ingredient',
    //     //     data: {label: 'child node 1'},
    //     //     position: {x: 10, y: 55 },
    //     //     parentNode: 'node-1',
    //     //     extent: 'parent',
    //     //     draggable: true,
    //     // } ];
    //
    //     // setNodes(nodes => [...nodes,
    //     //     {
    //     //         id: parentId+'-'+nodes?.length,
    //     //         type: 'Ingredient',
    //     //         data: {label: 'child node 1',type:'target'},
    //     //         position: {x: 10, y: 55 },
    //     //         parentNode: 'node-1',
    //     //         extent: 'parent',
    //     //         draggable: true,
    //     //     }])
    //
    // }


    const onNodesChange = useCallback(
        (changes: any) => {
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: any) => {
            setEdges((eds) => applyEdgeChanges(changes, eds))
        },
        []
    );
    const onConnect = useCallback(
        (connection: any) => {
            setEdges((eds) => addEdge(connection, eds))
        },
        []
    );

    const addProtocol = (type:any) => {
        const action = addNode(type.protocol?.toLowerCase());
        action(type);

    }

    const random = (max:number)=> Math.floor(Math.random() * max) + 1

    const onChildChange = useCallback(  (parentId:string , childIndex:string, value:any )=> {
        setNodes((nodes: Array<Node>) => {
            let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
            const updatedNodes = [...nodes]
           let childrenIndex =  updatedNodes[parentIndex].data.children?.findIndex((node: Node) => node.id == childIndex)
            updatedNodes[parentIndex].data.children[childrenIndex].data = {
               ... updatedNodes[parentIndex].data.children[childrenIndex].data,
                value
            }
            console.log('nodes',updatedNodes)
            return updatedNodes;
        })
    }, [setNodes])



    const addIngredientProtocol = (process:any = {}) => {
        const id = 'ingredient-' + (nodes?.length + 1);
        setNodes(nodes => [...nodes, {
            id: id,
            type: 'ingredient-container',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                value: 123,
                addAction: () => addIngredient(id),
                onChange : onChildChange,
                children: [],
                ...process
            }
        }
        ])
    }

    const addMerge = (process:any = {})=> {
        const id = 'merge-' + (random(100));
        setNodes(nodes => [...nodes, {
            id: id,
            type: 'merge',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                value: 123,
                addAction: () => addIngredient(id),
                children: [],
                ...process
            }
        }
        ])
    }

    const addServe = (process:any = {})=> {
        const id = 'serve-' + (random(100));

        setNodes(nodes => [...nodes, {
            id: id,
            type: 'serve',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                value: 123,
                addAction: () => addIngredient(id),
                children: [],
                ...process
            }
        }
        ])
    }

    const onClose = (id:string)=> {
           setNodes((nodes:Array<Node>)=> nodes.filter((node:Node) => node.id != id))
           setEdges((edges:Array<Edge>)=> edges.filter((edge:Edge) => edge.source != id ||  edge.target != id ))
    }


    const addProcess = (process:any = {})=> {
        const id = 'process-' + (nodes?.length + 1);
        console.log('process' ,process )
        setNodes(nodes => [...nodes, {
            id: id,
            type: 'process',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                value: 123,
                addAction: addProcessChild,
                onChange : onChildChange,
                onClose,
                children: process.inputs?.map((input:any , index:number) => {
                    const childId = `process-${id}-${index}`
                    return {
                        id: childId,
                        type:input.type,
                        position: {x: 10, y: 1},
                        draggable: true,
                        height: 100,
                        props: input.props,
                        data:{}
                    }
                }),
                ...process
            }
        }
        ])
    }

    const addNode = (type: string): any => {
        const actions: NodeActions = {
            ingredient: addIngredientProtocol,
            merge: addMerge,
            serve: addServe,
            process: addProcess
        }
        return actions[type] as Function
    }

    useEffect(()=>{
        console.log('edges' , edges)
    } , [edges])

    return (
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


    );
}

export default CreateEditProtocol;