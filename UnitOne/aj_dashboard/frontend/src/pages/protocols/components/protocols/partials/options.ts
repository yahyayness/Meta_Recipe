import {TextField} from "@mui/material";

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
                        type: 'select',
                        options: [
                            [
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
                        ]

                    }
                ]
            },
            {
                label: 'Fry',
                protocol: 'process',
                inputs: [
                    {
                        type: TextField,
                        props : {
                            type: 'time'
                        }
                    }
                ]
            },
            {
                label: 'Boil',
                protocol: 'process',
                inputs: [
                    {
                        type: TextField,
                        props : {
                            type: 'time'
                        }
                    }
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