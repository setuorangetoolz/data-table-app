import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";

export const SelectAllContacts = createSelector((state:RootState)=>state.contacts,contacts=>contacts)