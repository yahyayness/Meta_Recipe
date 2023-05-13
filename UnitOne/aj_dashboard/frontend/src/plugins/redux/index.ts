import breadcrumbs from "./reducers/breadcrumbs";
import alert from './reducers/alert'
import {configureStore} from '@reduxjs/toolkit'
import httpLoader from "./reducers/httpLoader";

export const store = configureStore({
    reducer: {
        ...breadcrumbs,
        ...alert,
        ...httpLoader
    }
})