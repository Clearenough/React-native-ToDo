import {nanoid} from '@reduxjs/toolkit';
import React from 'react';
import {useAppDispatch} from '../../hooks/hooks';
import {addTask} from '../../store/slices/tasksSlice';
import TaskForm from '../TaskForm';

function Header() {
  const dispatch = useAppDispatch();

  function onCreate(text: string) {
    dispatch(
      addTask({
        id: nanoid(),
        isCompleted: false,
        text,
      }),
    );
  }

  return <TaskForm handler={onCreate} />;
}

export default Header;
