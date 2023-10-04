import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {ITask, TasksState} from '../../types/common';

const initialState: TasksState = [
  {
    id: '1',
    text: 'haha',
    isCompleted: false,
  },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state: TasksState, action: PayloadAction<ITask>) => {
        state.push(action.payload);
      },
      prepare: (text: string) => {
        return {
          payload: {
            id: nanoid(),
            text,
            isCompleted: false,
          },
        };
      },
    },
    deleteTask: (state: TasksState, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.findIndex(task => task.id === id);
      state.splice(index, 1);
    },
    updateTask: (state: TasksState, action: PayloadAction<ITask>) => {
      const {id, text} = action.payload;
      const updatedTask = state.find(task => task.id === id);
      if (updatedTask) {
        updatedTask.text = text;
      }
    },
    completeTask: (state: TasksState, action: PayloadAction<string>) => {
      const id = action.payload;
      const completedTask = state.find(task => task.id === id);
      if (completedTask) {
        completedTask.isCompleted = !completedTask.isCompleted;
      }
    },
  },
});

export const {addTask, deleteTask, updateTask, completeTask} =
  tasksSlice.actions;
export default tasksSlice.reducer;
