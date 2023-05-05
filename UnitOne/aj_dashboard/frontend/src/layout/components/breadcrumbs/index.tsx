import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {Breadcrumbs as Bread} from "@mui/material";

const Breadcrumbs:React.FC = ()=>{
    /**
     * redux state
     * @author Amr
     */
    const state = useSelector(state => state)
    /**
     * pages' breadcrumbs
     * @author Amr
     */
    const [breadcrumbs , setBreadcrumbs] = useState([] as Array<BreadcrumbType>)
    /**
     * handel the changes of Breadcrumb
     * @author Amr
     */
    useEffect(()=>{
        setBreadcrumbs((state as any)?.breadcrumbs);
    },  [(state as any).breadcrumbs])

    return (
        <Bread aria-label="breadcrumb">
            {
                (breadcrumbs || [] ).map((item:BreadcrumbType , index:number) =>  <NavLink key={'bread-'+index} className={[`breadcrumb-item` , item?.hasOwnProperty('isCurrent') && item?.isCurrent == true ? 'active' :  ''].join(" ")} to={item.path}>{item.label}</NavLink>)
            }
        </Bread>
    );
}

export default Breadcrumbs;