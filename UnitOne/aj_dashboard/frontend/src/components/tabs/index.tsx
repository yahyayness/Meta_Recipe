import {TabContext, TabList} from "@mui/lab";
import Box from "@mui/material/Box";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import ProtocolsOptions from "../../pages/protocols/components/protocols";
import React, {memo} from "react";

const AppTabs:React.FC<any> = ({tabs})=>{
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => setValue(newValue)
    return (
        <TabContext value={value} key={`tab-${value}`}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example"  scrollButtons={true}  variant="scrollable">
                    {tabs?.map((tab:any , index:number)=>  <Tab label={tab.label} key={`tab-label-${index}`} value={`${index+1}`} />)}
                </TabList>
            </Box>
            {tabs?.map((tab:any , index:number)=>  <TabPanel  key={`tab-panel-${index}`} value={`${index+1}`}   {...(tab.tabProps ?? {})}>{React.createElement(tab.component , {...tab.props ?? {} })}</TabPanel>)}
        </TabContext>
    );
}

export default memo(AppTabs);