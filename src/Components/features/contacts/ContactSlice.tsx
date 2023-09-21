import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {contactValueInterface} from "../../AddOrEditModal";

// export interface ContactState {
//     value:number,
//
// }

const ContactSlice = createSlice({
    name: 'contacts',
    initialState: [] as contactValueInterface[],
    reducers: {
        addContact: (state, action: PayloadAction<contactValueInterface>) => {
            // Add the new contact to the state
            state.push(action.payload);
        },
        deleteContact: (state,action)=>{
            return state.filter((item,index)=>index + 1 !== action.payload)
        },
        editContact: (state,action:PayloadAction<contactValueInterface>)=>{
            const contactIndex = state.findIndex(contact=>contact === action.payload)
            const contactId = contactIndex + 1;
            console.log(contactIndex,contactId, action.payload)
            if(contactId !== -1){
                // state[contactIndex] = action.payload;
                state.splice(contactIndex,1, action.payload)
            }
        }
    }
})


export const { addContact,deleteContact,editContact } = ContactSlice.actions

export default ContactSlice.reducer