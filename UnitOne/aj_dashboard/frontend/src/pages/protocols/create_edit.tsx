import React, {useEffect, useState} from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import './partials/style.scss'
import IngredientGroup from './components/ingredient/index';
import { Button, Stack, TextField, Select, MenuItem, FormControl, InputLabel, Tabs, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import Ingredient from './components/ingredient-row/index'
import IngredientRow from "./components/ingredient-row/index";
import Merge from "./components/merge";
import Serve from "./components/serve";
import ProtocolsOptions from "./components/protocols";
import Process from "./components/process";
import { IconButton } from "@mui/material";
import useProtocol from "./partials/hooks";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BasicModal from "./components/protocols/components/extra-amount/index"
import MessageModal from "./components/protocols/components/save-as-racipt/index"
import {a11yProps} from "../protocols/components/tabs/index"
import DropdownMenu from "../../components/menu/index";
import {TabContext, TabList} from "@mui/lab";
import TabPanel from '@mui/lab/TabPanel';
import AppTabs from "../../components/tabs";
import AddTab from "./components/tabs/Add";

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

const menuList = [
    {
        name:"Save As Recipe",
        action:()=>{}
    },
];


const EXTRA_HEIGHT = 55;

const CreateEditProtocol: React.FC = () => {



    const { onSave, onDuplicate, nodes, edges, onNodesChange, onEdgesChange, onConnect, addProtocol,
        counter, openModel, handleOpenModel, ExtraAmountModal, saveSensory, id, extra, setExtra, setForm,
         name, setName, project, setProject, projects, rTabsValue,setRTabsValue,openSaveAsRicpeModel,
         setOpenSaveAsRicpeModel  , form ,saveAsRecipe, handleFormChanges , isEdit}

        = useProtocol();


    const [tabs , setTabs] = useState<any>([]);
    useEffect(()=> {
        setTabs([
            {
                label : "Add",
                component : ProtocolsOptions,
                props : {
                    handleFormChanges: handleFormChanges,
                    allProjects: projects,
                    protocolName: form?.name,
                    protocolProject : form?.project
                }
            },
            // {
            //     label : "Design",
            //     component : ProtocolsOptions,
            //     props : {
            //         handleFormChanges: handleFormChanges,
            //         allProjects: projects,
            //         protocolName: form?.name,
            //         project : form?.project
            //     }
            // }
        ])
    } , [form])
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };


    return (
        <>

            <Stack flexDirection='row'>
                <Box width="100%" style={{ height: '80ch' }} key={'nodes-' + counter}>
                    <Stack spacing={2} direction="row" justifyContent="right" className="list-master-actions" width="100%">
                        <Button variant="text" color="info" onClick={onDuplicate}>Duplicate</Button>
                        <Button variant="text" color="primary" className='primary' onClick={onSave}>Save</Button>
                        {isEdit && <Button variant="text" color="info" onClick={() => handleOpenModel(true)}>Predict</Button>}
                        {/*  <DropdownMenu menuList={menuList}/> */}
                    </Stack>
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
                <BasicModal
                    open={openModel}
                    setOpen={handleOpenModel}
                    protocol_id={id}
                    sensory={extra}
                    setSensory={setExtra}
                    afterSave={saveSensory}
                    setForm={setForm}
                />
                <MessageModal
                    open={openSaveAsRicpeModel}
                    setOpen={(status : boolean) => setOpenSaveAsRicpeModel(status)}
                    message="The protocol will be as recipe are you sure ? "
                    onSave={saveAsRecipe}
                />


                <Box width='20%' className="protocols-items" mr={-3} mt={-11}>

                    <AppTabs tabs={
                        [
                            {
                                label : "Form",
                                component : ProtocolsOptions,
                                props : {
                                    handleFormChanges: handleFormChanges,
                                    allProjects: projects,
                                    protocolName: form?.name,
                                    protocolProject : form?.project,
                                    addProtocol : addProtocol
                                }
                            },
                            {
                                label : "Add",
                                component : AddTab,
                                props : {
                                    handleFormChanges: handleFormChanges,
                                    addProtocol : addProtocol
                                },
                                tabProps : {
                                    style: {padding : 0}
                                }
                            }
                        ]
                    }></AppTabs>
                    {/*<TabContext value={value} key={`tab-${value}`}>*/}
                    {/*    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>*/}
                    {/*        <TabList onChange={handleChange} aria-label="lab API tabs example"  scrollButtons={true}  variant="scrollable">*/}
                    {/*            <Tab label="Item One" value="1" />*/}
                    {/*            <Tab label="Item Two" value="2" />*/}
                    {/*            <Tab label="Item Three" value="3" />*/}
                    {/*        </TabList>*/}
                    {/*    </Box>*/}
                    {/*    <TabPanel value="1" >*/}
                    {/*        <ProtocolsOptions addProtocol={addProtocol}  allProjects={projects} protocolName={name} />*/}
                    {/*    </TabPanel>*/}
                    {/*    <TabPanel value="2">Item Two</TabPanel>*/}
                    {/*    <TabPanel value="3">Item Three</TabPanel>*/}
                    {/*</TabContext>*/}
                </Box>


                {/*<Box width='20%' className="protocols-items" mr={-3} mt={-11}>*/}
                {/*    <Tabs value={rTabsValue} onChange={(event: React.SyntheticEvent, newValue: number)=>setRTabsValue(newValue)} aria-label="basic tabs example">*/}
                {/*        <Tab label="Add" {...a11yProps(0)} />*/}
                {/*        <Tab label="Design" {...a11yProps(1)} />*/}
                {/*        <Tab label="Generate" {...a11yProps(2)} />*/}
                {/*    </Tabs>*/}
                {/*    <TabPanel value={rTabsValue} value={0}>*/}
                {/*        <ProtocolsOptions addProtocol={addProtocol}  allProjects={projects} protocolName={name}/>*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={rTabsValue} value={1}>*/}
                {/*        Item Two*/}
                {/*    </TabPanel>*/}
                {/*    <TabPanel value={rTabsValue} value={2}>*/}
                {/*        Item Three*/}
                {/*    </TabPanel>*/}
                {/*</Box>*/}

            </Stack>
        </>



    );
}

export default CreateEditProtocol;