import breadcrumbs from "./reducers/breadcrumbs";
import alert from './reducers/alert'
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        ...breadcrumbs,
        ...alert
    }
})