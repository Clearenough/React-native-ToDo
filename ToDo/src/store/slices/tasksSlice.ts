import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task, TasksState} from '../../types/common';

const initialState: TasksState = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state: TasksState, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    deleteTask: (state: TasksState, action: PayloadAction<number>) => {
      const id = action.payload;
      state.filter(task => id !== task.id);
    },
    updateTask: (state: TasksState, action: PayloadAction<Task>) => {
      const {id, text} = action.payload;
      const updatedTask = state.find(task => task.id === id);
      if (updatedTask) {
        updatedTask.text = text;
      }
    },
    completeTask: (state: TasksState, action: PayloadAction<number>) => {
      const id = action.payload;
      const completedTask = state.find(task => task.id === id);
      if (completedTask) {
        completedTask.isCompleted = true;
      }
    },
  },
});

export const {addTask, deleteTask, updateTask, completeTask} =
  tasksSlice.actions;
