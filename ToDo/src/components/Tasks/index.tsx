import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {deleteTask} from '../../store/slices/tasksSlice';
import {ITask} from '../../types/common';
import Task from '../Task';

function Tasks() {
  const tasks = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={task => <Task task={task.item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Tasks;
