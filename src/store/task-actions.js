import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    taskName: "",
    isEdit: false,
    id: "",
    timeInSeconds: 0,
    flag: false,
  },
  reducers: {
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask(state, action) {
      const newItems = state.tasks.filter(
        (task, index) => index !== action.payload
      );
      state.tasks = newItems;
    },
    setTaskName(state, action) {
      state.taskName = action.payload;
    },
    editData(state, action) {
      state.isEdit = true;
      const editValue = state.tasks[action.payload].task;
      state.taskName = editValue;
      state.id = action.payload;
    },
    updateData(state, action) {
      state.tasks[state.id].task = action.payload;
      state.isEdit=false;
     
      

    },
    startTimer(state, action) {
      state.tasks[action.payload].timeInSeconds += 1;
    },
    setTimerFlag(state, action) {
      state.tasks[action.payload].flag = true;
    },
    removeFlag(state, action) {
      state.tasks[action.payload].flag = false;
    },
  },
});

export const taskActions = TaskSlice.actions;

export default TaskSlice;
