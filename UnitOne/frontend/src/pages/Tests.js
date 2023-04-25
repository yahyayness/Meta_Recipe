import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const StyledSlider = withStyles({
  root: {
    border: 0,
    color: '#2f1544;',


  },
  mark : {
    backgroundColor: '#2f1544',
    height: 10,
    width: 1,
    marginLeft: 0,
    marginTop: -4,
    borderRadius: 1
  } , 
  track : {
    // color: '#2f1544;',
    // width: 1,
    // marginTop:-1
    // marginTop:
    height:1

  } , 
  thumb : {
    color: '#2f1544;',
    borderRadius: 0,
    height: 14,
    width:3,
    marginTop: -6,
    marginLeft: -0.5,
    borderRadius: 10


  },
  rail: {
    height: 1,
    backgroundColor: '#2f1544',
    color: '#2f1544',
    opacity:1
  },

  markLabel : {
    fontSize:6,
    marginLeft: 0,
    marginTop:-6
  }

  
})(Slider);




const marks = [
  {
    // value: ingredient.min,
    label: 5,
    value: 0,
  },

  {
    value: 0.25,
  },
  {
    value: 0.50,
  },
  {
    value: 0.75,
  },
  {
    label: 100,
    value: 1,
  },
];


export default function ClassesShorthand() {
  return (

    <div className="container my-5" style={{height: "50vh"}} >
      <StyledSlider className=""

        step={0.01}
        // value={0}
        // orientation="vertical"


        // min = {ingredient.min}
        // max = {ingredient.max}
        min={0}
        max={1}
        // valueLabelDisplay="auto"
        marks={marks}


      />
    </div>
  )
}