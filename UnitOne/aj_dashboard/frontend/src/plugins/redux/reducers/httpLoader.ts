import {createSlice} from "@reduxjs/toolkit";

const httpLoader = createSlice({
    name: 'httpLoader',
    initialState: false,
    reducers: {
        showLoader(state, action) {
            return action?.payload
        }
    }
})
export const {showLoader} = httpLoader.actions

export default {
    httpLoader: httpLoader.reducer
};