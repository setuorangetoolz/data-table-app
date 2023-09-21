import {configureStore} from "@reduxjs/toolkit";
import ContactSlice from "./contacts/ContactSlice";

const store = configureStore({
    reducer:{
        contacts : ContactSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export default store;
