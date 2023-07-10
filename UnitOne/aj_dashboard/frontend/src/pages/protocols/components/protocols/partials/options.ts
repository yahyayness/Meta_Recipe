import {TextField} from "@mui/material";
import {TimePicker} from "antd";
import ProtocolSelect from "../components/select";
import {getDefaultTime} from "../../../../../common/helpers";

export default [
    {
        label: 'Ingredient',
        protocol: 'ingredient'
    },
    {
        label: 'Process',
        protocol: 'process',
        children: [
            {
                label: 'Chop',
                protocol: 'process',
                inputs: [
                    {
                        type: 'ProtocolSelect',
                        props : {
                            options:  [
                                {
                                    label: 'Big',
                                    value: 'big'
                                },
                                {
                                    label: 'Medium',
                                    value: 'medium'
                                },
                                {
                                    label: 'Small',
                                    value: 'small'
                                }
                            ]
                        }


                    }
                ]
            },
            {
                label: 'Fry',
                protocol: 'process',
                inputs: [
                    {
                        type: 'TimePicker',
                        props : {
                            format:'hh:mm',
                            style : {
                                height: '45px'
                            }

                        }
                    },
                ]
            },
            {
                label: 'Boil',
                protocol: 'process',
                inputs: [
                    {
                        type: 'TimePicker',
                        props : {
                            format:'hh:mm',
                            style : {
                                height: '45px'
                            },
                            value: '12:00'
                        }
                    }
                ]
            },
            {
                label: 'Bake',
                protocol: 'process',
                inputs: [
                    {
                        type: 'TimePicker',
                        props : {
                            format:'hh:mm',
                            style : {
                                height: '45px'
                            }

                        }
                    },
                ]
            },
        ]
    },
    {
        label: 'Merge',
        protocol: 'merge'
    },
    {
        label: 'Serve',
        protocol: 'serve'
    },
]
