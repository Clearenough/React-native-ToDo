import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
// import {Swipeable} from 'react-native-gesture-handler';
import {ITask} from '../../types/common';
import Icon from 'react-native-vector-icons/Feather';
import {useAppDispatch} from '../../hooks/hooks';
import {updateTask} from '../../store/slices/tasksSlice';
import TaskForm from '../TaskForm';

interface TaskProps {
  task: ITask;
}

function Task({task}: TaskProps) {
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const dispatch = useAppDispatch();

  function onPress() {
    setIsUpdateTask(true);
  }

  function onUpdateTask(text: string) {
    dispatch(
      updateTask({
        ...task,
        text,
      }),
    );
    setIsUpdateTask(false);
  }

  return (
    <View style={styles.container}>
      {isUpdateTask ? (
        <TaskForm handler={onUpdateTask} />
      ) : (
        <View style={styles.container}>
          <Text>{task.text}</Text>
          <Pressable onPress={onPress}>
            <Icon name="edit-2" />
          </Pressable>
        </View>
      )}
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
