import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
// import {Swipeable} from 'react-native-gesture-handler';
import {ITask} from '../../types/common';
import Icon from 'react-native-vector-icons/Feather';

interface TaskProps {
  task: ITask;
}

function Task({task}: TaskProps) {
  return (
    <View style={styles.container}>
      <Text>{task.text}</Text>
      <Pressable onPress={() => console.log(task)}>
        <Icon name="edit-2" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
});

export default Task;
