import React, {useCallback} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ListRenderItemInfo,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {useAppSelector} from '../../hooks/hooks';
import {selectTasks} from '../../store/slices/tasksSlice';
import {ITask} from '../../types/common';
import Task from '../Task';

function Tasks() {
  const tasks = useAppSelector(selectTasks);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<ITask>) => <Task task={item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        behavior="position">
        <FlatList
          data={tasks}
          renderItem={renderItem}
          scrollEnabled={Platform.OS === 'ios' && true}
          keyExtractor={item => item.id}
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
