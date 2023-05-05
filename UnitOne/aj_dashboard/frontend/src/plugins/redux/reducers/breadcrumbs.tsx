import {createSlice} from "@reduxjs/toolkit";
import {Simulate} from "react-dom/test-utils";

const breadcrumbs = createSlice({
    name: 'breadcrumbs',
    initialState: [],
    reducers: {
        setBreadcrumbs(state, action) {
            return action?.payload ?? state
        }
    }
})
export const {setBreadcrumbs} = breadcrumbs.actions

export default {
    breadcrumbs: breadcrumbs.reducer
};