import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FormValues} from "../../AddOrEditModal";

// export interface ContactState {
//     value:number,
//
// }

const ContactSlice = createSlice({
    name: 'contacts',
    initialState:[] as FormValues[],
    reducers:{
        addContact: (state, action:PayloadAction<FormValues>) => {
            // Add the new contact to the state
            state.push(action.payload);
        },
        // deleteContact(state,action)=>{}
    }
})
export const { addContact } = ContactSlice.actions

export default ContactSlice.reducer