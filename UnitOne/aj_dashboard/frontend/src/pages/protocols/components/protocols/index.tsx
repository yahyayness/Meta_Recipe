import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {
    Button,
    Collapse,
    Divider,
    FormControl,
    InputLabel,
    ListItem,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, {memo, useEffect, useState} from "react";
import options from "./partials/options";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {boolean, number} from "yup";
import {ProjectType} from "../../../../types/ModelTypes";

const ProtocolsOptions: React.FC<any> = ({addProtocol , protocolName, allProjects = [] , handleFormChanges , protocolProject}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [name, setName] = useState( '');
    const [project, setProject] = useState<string>( '');
    const [projects, setProjects] = useState<Array<ProjectType>>(allProjects)

    const handleClick = () => {
        setOpen(!open);
    };
    useEffect(()=>{
        setName(protocolName)
        setProject(protocolProject)
    } , [protocolName , protocolProject])

    return (
        <Box /* width='20%' className="protocols-items" mr={-3} mt={-11} */>
            <Stack spacing={2} >
                <TextField
                    label="Protocol Name"
                    id="date"
                    size="small"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) =>    handleFormChanges(e.target.value , project)}
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
                        label="Project
                        "
                        placeholder="No project for this protocol"
                        MenuProps={{
                            PaperProps: {
                                // style: {
                                //     width: 250,
                                // },
                            },
                        }}
                        value={project}
                        onChange={(event) => handleFormChanges(name , event.target.value)}
                    >
                        <MenuItem value="">No Protocol</MenuItem>
                        {
                            allProjects.map((project:any , index:number) => {
                                return (
                                    <MenuItem value={project.id} key={`project-${index}`}>{project.name}</MenuItem>
                                )
                            })
                        }

                    </Select>
                </FormControl>

            </Stack>
            {/*<List>*/}
            {/*    <ListItem className="justify-center">Add Protocol</ListItem>*/}
            {/*    <Divider/>*/}
            {/*    {options.map((node, index) => (*/}
            {/*        node?.children ?*/}
            {/*            <>*/}
            {/*                <ListItem key={'protocol-list-items-' + index} disablePadding>*/}

            {/*                    <ListItemButton onClick={handleClick}>*/}

            {/*                        <ListItemText primary={node.label}/>*/}
            {/*                        <ListItemIcon>*/}
            {/*                            {open ? <ExpandLess/> : <ExpandMore/>}*/}
            {/*                        </ListItemIcon>*/}
            {/*                    </ListItemButton>*/}
            {/*                </ListItem>*/}
            {/*                <Divider key={'divider-protocol-list-items-nested' + index}/>*/}
            {/*                <Collapse in={open} timeout="auto" unmountOnExit key={'Collapse-items-nested' + index}>*/}
            {/*                    <List component="div" style={{paddingLeft: '25px'}}>*/}
            {/*                        {node?.children?.map((nestedNode: any, index: number) => (*/}
            {/*                            <ListItemButton onClick={() => addProtocol(nestedNode)} key={`${node.label}-${nestedNode.label}-${index}`} >*/}
            {/*                                <ListItemText primary={nestedNode.label}/>*/}
            {/*                                <ListItemIcon>*/}
            {/*                                    <AddCircleIcon/>*/}
            {/*                                </ListItemIcon>*/}
            {/*                            </ListItemButton>*/}
            {/*                        ))}*/}

            {/*                    </List>*/}
            {/*                </Collapse>*/}
            {/*            </>*/}

            {/*            :*/}
            {/*            <>*/}
            {/*                <ListItem key={'protocol-list-items-' + index} disablePadding>*/}

            {/*                    <ListItemButton onClick={() => addProtocol(node)}>*/}
            {/*                        <ListItemText primary={node.label}/>*/}
            {/*                        <ListItemIcon>*/}
            {/*                            <AddCircleIcon/>*/}
            {/*                        </ListItemIcon>*/}
            {/*                    </ListItemButton>*/}
            {/*                </ListItem>*/}
            {/*                <Divider key={'divider-protocol-list-items-' + index}/>*/}
            {/*            </>*/}

            {/*    ))}*/}
            {/*</List>*/}
        </Box>
    );
}

export default memo(ProtocolsOptions);