import {nanoid} from '@reduxjs/toolkit';
import React from 'react';
import {StyleSheet, View} from 'react-native';
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

  return (
    <View style={styles.container}>
      <TaskForm handler={onCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    border: '1px solid',
  },
});

export default Header;
