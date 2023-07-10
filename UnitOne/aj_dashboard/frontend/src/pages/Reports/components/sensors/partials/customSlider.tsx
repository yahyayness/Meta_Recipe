import {Card, CardContent, CardHeader, IconButton,Stack, Slider, FormControlLabel ,Switch  } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { styled } from '@mui/material/styles';


export const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 3,
    },
    {
      value: 5,
    },
    {
      value: 7,
    },
    {
      value: 9,
    },
    {
      value: 10,
      label: '10',
    },
  ];
  export const iOSBoxShadow =
'0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


export const SensorSlider = styled(Slider)(({ theme }) => ({
    padding: '0 25px ',
    margin:"0px",
    '& .MuiSlider-thumb': {
      height: 18,
      width: 30,
      opacity: 0.8,
      backgroundColor: '#E1E2F7',
      boxShadow: iOSBoxShadow,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow:
          '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    '& .MuiSlider-valueLabel': {
      fontSize: 12,
      fontWeight: 'normal',
      top: -6,
      right: 12,
      backgroundColor: 'unset',
      color: theme.palette.text.primary,
      '&:before': {
        display: 'none',
      },
      '& *': {
        background: 'transparent',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      },
    },
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-rail': {
      opacity:1,
      width:3,
      backgroundColor: '#000',
    },
    '& .MuiSlider-mark': {
      backgroundColor: '#000000',
      height: 2,
      width: 15,
      '&.MuiSlider-markActive': {
        opacity: 0.8,
        backgroundColor: '#000',
      },
    },
  }));

   
  export function valuetext(value: number) {
    return `${value}`;
  }
