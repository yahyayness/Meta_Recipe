import Box from "@mui/material/Box";
import List from "@mui/material/List";
import {Collapse, Divider, ListItem} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, {useState} from "react";
import options from "./partials/options";
import {ExpandLess, ExpandMore, StarBorder} from "@mui/icons-material";
import {boolean} from "yup";

const ProtocolsOptions: React.FC<any> = ({addProtocol}) => {
    const [open, setOpen] = useState<boolean>(false)
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <Box /* width='20%' className="protocols-items" mr={-3} mt={-11} */>
            <List>
                <ListItem className="justify-center">Add Protocol</ListItem>
                <Divider/>
                {options.map((node, index) => (
                    node?.children ?
                        <>
                            <ListItem key={'protocol-list-items-' + index} disablePadding>

                                <ListItemButton onClick={handleClick}>

                                    <ListItemText primary={node.label}/>
                                    <ListItemIcon>
                                        {open ? <ExpandLess/> : <ExpandMore/>}
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <Divider key={'divider-protocol-list-items-nested' + index}/>
                            <Collapse in={open} timeout="auto" unmountOnExit key={'Collapse-items-nested' + index}>
                                <List component="div" style={{paddingLeft: '25px'}}>
                                    {node?.children?.map((nestedNode: any, index: number) => (
                                        <ListItemButton onClick={() => addProtocol(nestedNode)} key={`${node.label}-${nestedNode.label}-${index}`} >
                                            <ListItemText primary={nestedNode.label}/>
                                            <ListItemIcon>
                                                <AddCircleIcon/>
                                            </ListItemIcon>
                                        </ListItemButton>
                                    ))}

                                </List>
                            </Collapse>
                        </>

                        :
                        <>
                            <ListItem key={'protocol-list-items-' + index} disablePadding>

                                <ListItemButton onClick={() => addProtocol(node)}>
                                    <ListItemText primary={node.label}/>
                                    <ListItemIcon>
                                        <AddCircleIcon/>
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <Divider key={'divider-protocol-list-items-' + index}/>
                        </>

                ))}
            </List>
        </Box>
    );
}

export default ProtocolsOptions;