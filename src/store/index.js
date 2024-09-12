import { configureStore } from "@reduxjs/toolkit";
import TaskSlice from "./task-actions";

const store=configureStore({
    reducer:TaskSlice.reducer
})

export default store;

