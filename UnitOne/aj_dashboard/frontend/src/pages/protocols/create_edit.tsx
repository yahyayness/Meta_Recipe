import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import './partials/style.scss'
import IngredientGroup from './components/ingredient/index';
import {Button, Stack, TextField, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
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

    const { onSave, onDuplicate, nodes, edges, onNodesChange, onEdgesChange, onConnect, addProtocol,
        counter, openModel, handleOpenModel, ExtraAmountModal, onSaveAdjustment, id, extra, setForm, name, setName,project,setProject, projects }
        = useProtocol();
    return (
        <>

            <Stack flexDirection='row'>
                <Box width="100%" style={{ height: '80ch' }} key={'nodes-' + counter}>
                    <Stack spacing={2} direction="row" justifyContent="space-between" className="list-master-actions" width="100%">

                        <TextField
                            label="Protocol Name"
                            id="date"
                            size="small"
                            name="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                style: { fontSize: '13.45px' },
                                shrink: true,
                            }}
                            InputProps={{
                                style: { fontSize: '13.45px' }
                            }}

                        />

                        <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
                            <InputLabel id="demo-simple-select">Project</InputLabel>

                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                size="small"
                                label="Project"
                                value={project}
                                placeholder="No project for this protocol"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                          width: 250,
                                        },
                                      },
                                }}
                                onChange={(event) => setProject(event.target.value as number)}
                                >
                                    <MenuItem value="">No Protocol</MenuItem>
                                    {
                                        projects.map((project) =>{
                                            return (
                                                <MenuItem value={project.id}>{project.name}</MenuItem>
                                            )
                                        })
                                    }

                            </Select>
                        </FormControl>

                        <Stack spacing={2} direction="row" justifyContent="right" className="list-master-actions" width="100%">
                            <Button variant="text" color="info" onClick={onDuplicate}>Duplicate</Button>
                            <Button variant="text" color="primary" className='primary' onClick={onSave}>Save</Button>
                            <Button variant="text" color="info" onClick={() => handleOpenModel(true)}>adjust</Button>
                            {/*<IconButton  onClick={()=>handleOpenModel(true)} component="label" key={'stack-list-actions'}>*/}
                            {/*    <MoreVertIcon/>*/}
                            {/*</IconButton>*/}

                        </Stack>

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
                    extra={extra}
                    afterSave={onSaveAdjustment}
                    setForm={setForm}
                />
                <ProtocolsOptions addProtocol={addProtocol} />

            </Stack>
        </>



    );
}

export default CreateEditProtocol;