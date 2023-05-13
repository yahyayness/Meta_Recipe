import {createSlice} from "@reduxjs/toolkit";
import {Simulate} from "react-dom/test-utils";

const alert = createSlice({
    name: 'alert',
    initialState: {},
    reducers: {
        show(state, action) {
            return action?.payload ?? state
        }
    }
})
export const {show} = alert.actions

export default {
    alert: alert.reducer
};