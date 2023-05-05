import {Menu} from "antd";
import React from "react";
import getMenuItems from "./partials/list";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "@mui/material";
import {Navigate, NavLink} from "react-router-dom";
import {getRoute} from "../../../routes/list";

const AppMenu: React.FC = () => {
    const items = getMenuItems();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    /**
     * select menu's item
     * @param event
     * @param index
     * @author Amr
     */
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };


    return (
        <List>
            {items.map((item: MenuItem) => (
                <NavLink to={item.route?.path ?? ''} key={item.key} className="menu-item-nav" state={{name : item?.route?.name}}>
                    <ListItem  disablePadding className="list-item">
                        {selectedIndex === item.key && <span className="selected-item-indicator"></span>}
                        <ListItemButton
                            className={["menu-item", selectedIndex === item.key ? 'selected' : ''].join(' ')}
                            selected={selectedIndex === item.key}
                            onClick={(event) => handleListItemClick(event, item.key)}
                        >
                            <ListItemIcon>
                                {React.createElement(item.icon, {className: 'logo'})}
                            </ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                </NavLink>

            ))}
        </List>
    );
}

export default AppMenu;