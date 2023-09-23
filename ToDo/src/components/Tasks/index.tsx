import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {useAppSelector} from '../../hooks/hooks';
import Task from '../Task';

function Tasks() {
  const tasks = useAppSelector(state => state.tasks);

  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={task => <Task task={task.item} />} />
      <Text>afdadf</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Tasks;
