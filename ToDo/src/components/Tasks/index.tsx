import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {useAppSelector} from '../../hooks/hooks';
import {selectTasks} from '../../store/slices/tasksSlice';
import Task from '../Task';

function Tasks() {
  const tasks = useAppSelector(selectTasks);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        behavior="position">
        <FlatList
          data={tasks}
          renderItem={task => <Task task={task.item} />}
          scrollEnabled={true}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Tasks;
