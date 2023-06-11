import {Menu} from "antd";
import React from "react";
import getMenuItems from "./partials/list";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link} from "@mui/material";
import {Navigate, NavLink, useLocation} from "react-router-dom";
import {getRoute} from "../../../routes/list";

const AppMenu: React.FC = () => {
    const items = getMenuItems();
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const {pathname} =useLocation()
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

    /**
     * check the selected menu's item according to pathname and  item's path
     * @param path
     * @author Amr
     */
    const checkSelectedItem = (path:string)=> {
        if(path == pathname)
            return true;
         return path.replace('/' , '').trim() != '' && pathname.replace('/' , '').includes(path.replace('/', '')??'')
    }


    return (
        <List>
            {items.map((item: MenuItem) => (
                <NavLink to={item.route?.path ?? ''} key={item.key} className="menu-item-nav" state={{name : item?.route?.name}}>
                    <ListItem  disablePadding className="list-item">

                        {checkSelectedItem(item.route?.path??'') && <span className="selected-item-indicator"></span>}
                        <ListItemButton
                            className={["menu-item", checkSelectedItem(item.route?.path??'') ? 'selected' : ''].join(' ')}
                            selected={checkSelectedItem(item.route?.path??'')}
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