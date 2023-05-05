import breadcrumbs from "./reducers/breadcrumbs";
import {configureStore} from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
      ...breadcrumbs
    }
})