import {useCallback, useEffect, useState} from "react";
import {addEdge, applyEdgeChanges, applyNodeChanges, Edge, Node} from "reactflow";
import {number} from "yup";
import useBreadcrumb from "../../../common/hooks/breadcrumbs";
import {actions} from "./actions";
import {http, useHttp} from "../../../plugins/axios";
import {useAlert} from "../../../common/hooks/alert";
import {useNavigator} from "../../../common/routes";
import {useParams} from "react-router-dom";
import {addParamsToEndpoint, getEndpoint} from "../../../common/http";
import {ListType, ProjectType, ProtocolType} from "../../../types/ModelTypes";
import {AlertTypes} from "../../../types/Enums";
import {ResponseType} from "../../../types/HttpTypes";
import BasicModal from "../components/protocols/components/extra-amount/index"

/**
 * this hook handles the required operations for ReactFlow lib.
 * @param setNodes
 * @param setEdges
 * @author Amr
 */
const useFlowActions = (setNodes: React.Dispatch<React.SetStateAction<Array<Node>>>, setEdges: React.Dispatch<React.SetStateAction<Array<Edge>>>) => {

    /**
     * update nodes in the nodes when it receives updates
     * @author Amr
     */
    const onNodesChange = useCallback(
        (changes: any) => {
            setNodes((nds) => applyNodeChanges(changes, nds))
        },
        [setNodes]
    );
    /**
     * update edges in the edges when it receives updates
     * @author Amr
     */
    const onEdgesChange = useCallback(
        (changes: any) => {
            setEdges((eds) => applyEdgeChanges(changes, eds))
        },
        []
    );
    /**
     * start draw edge once user click on the handler of node
     * @author Amr
     */
    const onConnect = useCallback(
        (connection: any) => {
            setEdges((eds) => addEdge(connection, eds))
        },
        []
    );

    return {onNodesChange, onEdgesChange, onConnect}

}
const useCommon = (setNodes: React.Dispatch<React.SetStateAction<Array<Node>>>, setEdges: React.Dispatch<React.SetStateAction<Array<Edge>>>) => {
    /**
     * this method updates the value of children in the nodes list according to the
     * incoming value from child's component
     * @author Amr
     */
    const onChildChange = useCallback((parentId: string, childIndex: string, value: any) => {
        setNodes((nodes: Array<Node>) => {
            // find parent according to the passed parentId
            let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
            // clone nodes, so we can update the reference of nodes
            const updatedNodes = [...nodes]
            let childrenIndex = updatedNodes[parentIndex].data.children?.findIndex((node: Node) => node.id == childIndex)
            updatedNodes[parentIndex].data.children[childrenIndex].data = {
                ...updatedNodes[parentIndex].data.children[childrenIndex].data,
                value
            }
            return updatedNodes;
        })
    }, [setNodes])

    const random = (max: number) => Math.floor(Math.random() * max) + 1
    /**
     * remove node from nodes and from edges
     * @param id
     * @author Amr
     */
    const onClose = (id: string) => {
        setNodes((nodes: Array<Node>) => nodes.filter((node: Node) => node.id != id))
        setEdges((edges: Array<Edge>) => edges.filter((edge: Edge) => edge.source != id || edge.target != id))
    }

    return {onChildChange, random, onClose}

}

/**
 * this hook handles all ingredient's operations
 * @param nodes
 * @param setNodes
 * @param onChildChange
 * @author Amr
 */
const useIngredient = (nodes: Array<Node>, setNodes: (nodes: any) => any, onChildChange: any, onClose: any) => {

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
                            data: {type: 'target'},
                        },
                    ]
                };
            return updatedNodes;
        })
    }, [setNodes])

    const ingredientActions = {
        onClose,
        addAction: addIngredient,
        onChange: onChildChange,
    }
    const addIngredientProtocol = (process: any = {}) => {
        const id = 'ingredient-' + (nodes?.length + 1);
        setNodes((nodes: Array<Node>) => [...nodes, {
            id: id,
            type: 'ingredient-container',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                value: 123,
                ...ingredientActions,
                children: [],
                ...process
            }
        }
        ])
    }

    return {
        addIngredient,
        addIngredientProtocol,
        ingredientActions
    }

}
/**
 * this hook handles all merge component's operations
 * @param setNodes
 * @param random
 * @author Amr
 */
const useMerge = (setNodes: (nodes: any) => any, random: any, onClose: any) => {

    const mergeActions = {
        onClose,
    }
    const addMerge = (process: any = {}) => {
        const id = 'merge-' + (random(100));
        setNodes((nodes: Array<Node>) => [...nodes, {
            id: id,
            type: 'merge',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                ...mergeActions,
                children: [],
            }
        }
        ])
    }

    return {addMerge, mergeActions}
}

const useServe = (setNodes: (nodes: any) => any, random: any, onClose: any) => {
    const serveActions = {
        onClose,
    }
    const addServe = (process: any = {}) => {
        const id = 'serve-' + (random(100));
        setNodes((nodes: Array<Node>) => [...nodes, {
            id: id,
            type: 'serve',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                onClose,
                children: [],
            }
        }
        ])
    }

    return {addServe, serveActions}
}

const useProcess = (nodes: Array<Node>, setNodes: (nodes: any) => any, onChildChange: any, onClose: any) => {
    const addProcessChild = useCallback((parentId: string) => {
        setNodes((nodes: Array<Node>) => {
            let parentIndex = nodes?.findIndex((node: Node) => node.id == parentId)
            const updatedNodes = [...nodes]
            const nextId = parentId + '-' + (updatedNodes[parentIndex]?.data?.children?.length) + 1
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
    const processActions = {
        addAction: addProcessChild,
        onChange: onChildChange,
        onClose,
    }
    const addProcess = (process: any = {}) => {
        const id = 'process-' + (nodes?.length + 1);
        setNodes((nodes: Array<Node>) => [...nodes, {
            id: id,
            type: 'process',
            position: {x: 10, y: 1},
            draggable: true,
            height: 100,
            data: {
                ...processActions,
                children: process.inputs?.map((input: any, index: number) => {
                    const childId = `process-${id}-${index}`
                    return {
                        id: childId,
                        type: input.type,
                        position: {x: 10, y: 1},
                        draggable: true,
                        height: 100,
                        props: input.props,
                        data: {}
                    }
                }),
                ...process
            }
        }
        ])
    }


    return {addProcess, addProcessChild, processActions}
}

const useProtocol = () => {


    const [nodes, setNodes] = useState<Array<Node>>([]);
    const [edges, setEdges] = useState<Array<Edge>>([]);
    const [extra, setExtra] = useState({});
    const [counter, setCounter] = useState<number>(0)
    const {onChildChange, random, onClose} = useCommon(setNodes, setEdges)
    const {
        addIngredient,
        addIngredientProtocol,
        ingredientActions
    } = useIngredient(nodes, setNodes, onChildChange, onClose)
    const {addMerge, mergeActions} = useMerge(setNodes, random, onClose)
    const {addServe, serveActions} = useServe(setNodes, random, onClose)
    const {addProcess, addProcessChild, processActions} = useProcess(nodes, setNodes, onChildChange, onClose)
    const {onNodesChange, onEdgesChange, onConnect} = useFlowActions(setNodes, setEdges)
    const [form , setForm] = useState({});
    const {showAlert} = useAlert();
    const {navigator} = useNavigator()
    const {id , project_id} = useParams();
    const isEdit = !!id
    const {request} = useHttp();
    const [openModel, setOpenModel] = useState(false);
    const [openResetModel, setOpenResetModel] = useState(false);
    const handleOpenModel = (value:boolean) => setOpenModel(value);
    const handleOpenResetModel = (value:boolean) => setOpenResetModel(value);

    /**
     * this function binds the required actions to the nodes according
     * to node's type
     * @param nodes
     * @author Amr
     */
    const bindActions = (nodes: Array<Node>) => {
        // object that contains the node type as key and
        // list of actions as the value of that key
        const _actions:any = {
            'ingredient-container': ingredientActions,
            'process': processActions,
            serve: serveActions,
            merge: mergeActions
        }
        // walk through the node list and connect their nodes
        // with suitable actions
      return  nodes.map((node:Node) => {
          node.data = {
              ... node.data,
              ..._actions[node.type??'']
          }
          return node;

        })
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

    /**
     * add a new protocol according to the name of protocol
     * @Note: check addNode function to reach to the function that adds the node
     * accordin' to its type
     * @param type
     * @author Amr
     */
    const addProtocol = (type: any) => {
        const action = addNode(type.protocol?.toLowerCase());
        action(type);

    }


    const addChild = (type: string) => {
        const actions: any = {
            serve: addServe,
            process: addProcess,
            ingredient: addIngredientProtocol,
            merge: addMerge
        }
        return actions[type] as Function
    }


    /**
     * this one is used to add node to the flow board
     * @param type
     * @author Amr
     */
    const addNode = (type: string): any => {
        const actions: NodeActions = {
            ingredient: addIngredientProtocol,
            merge: addMerge,
            serve: addServe,
            process: addProcess
        }
        return actions[type] as Function
    }

    /**
     * fetch protocol once you get a valid id
     * @author Amr
     */
    useEffect(() => {
        if (id) {
            http<ResponseType<ProtocolType>>(addParamsToEndpoint(getEndpoint('find_protocol'), {id})).then(response => {
                setForm(response.data.payload);
                setNodes(bindActions(response.data.payload.flow.nodes))
                setEdges(response.data.payload.flow.edges)
                setExtra({...response.data.payload.extra})
                console.log('extra' , extra)
            })
        }
    }, [id])


    const onSave = () => {
        let _form = {
            ...form,
            project:project_id,
            flow : {
                nodes: nodes,
                edges: edges
            }
        }
        console.log('form', _form, JSON.stringify(_form))
        // change the endpoint according to the isEdit flag
        const endpoint = isEdit ? addParamsToEndpoint(getEndpoint('update_protocol'), {
            project_id,
            id: id
        }) : addParamsToEndpoint(getEndpoint('add_protocol'), {project_id, id: id})
        /**
         * save user
         * @author Amr
         */
        request<ProtocolType>(endpoint, _form).then((response) => {
            const protocol = response?.data?.payload
            showAlert({
                type: AlertTypes.SUCCESS,
                message: `Protocol ${protocol.name} ${isEdit ? 'updated' : 'added'}  successfully`
            })
            navigator('/protocols');
        })
    }

    const onDuplicate = () => {
        request<ListType<ProtocolType>>(getEndpoint('clone_protocols'), {ids : [id]} ).then(response => {
            showAlert({
                type: AlertTypes.SUCCESS,
                message: `Protocols cloned successfully`
            })
        })
    }

    const onSaveAdjustment = (response:any)=> {
        console.log('response' , response.data.payload.flow.nodes)
        setNodes([...bindActions(response.data.payload.flow.nodes)])
        setEdges([...response.data.payload.flow.edges])
        setCounter((counter:number) => counter + 1)
        handleOpenModel(false)
        showAlert({
            type: AlertTypes.SUCCESS,
            message: `Protocol adjusted successfully`
        })
    }
    const ExtraAmountModal = () => {
        // return BasicModal(openModel,handleOpenModel,id,extra,setNodes,setEdges,setForm , bindActions , setCounter,callback)
    }

    const resetprotocol = (id:number) => {
        if (id) {
            http<ResponseType<ProtocolType>>(addParamsToEndpoint(getEndpoint('find_protocol'), {id})).then(response => {
                setForm(response.data.payload);
                setNodes(bindActions(response.data.payload.flow.nodes))
                setEdges(response.data.payload.flow.edges)
                setExtra({...response.data.payload.extra})
                setCounter((counter:number) => counter + 1)
                handleOpenResetModel(false)
                showAlert({
                    type: AlertTypes.SUCCESS,
                    message: `Protocol Reset successfully`
                })
            })
        }
    }

  

    return {onSave, onDuplicate, nodes, edges, onNodesChange, onEdgesChange, onConnect, addProtocol,
        counter,openModel,ExtraAmountModal , onSaveAdjustment ,handleOpenModel,id,extra , setForm,openResetModel,handleOpenResetModel,resetprotocol}

}

export default useProtocol