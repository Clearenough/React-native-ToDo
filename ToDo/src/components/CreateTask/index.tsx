import React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {nanoid} from '@reduxjs/toolkit';
import Icon from 'react-native-vector-icons/AntDesign';
import {useAppDispatch} from '../../hooks/hooks';
import {addTask} from '../../store/slices/tasksSlice';
import {ITask} from '../../types/common';

function CreateTask() {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  function onPress() {
    const newTask: ITask = {
      id: nanoid(),
      text,
      isCompleted: false,
    };
    dispatch(addTask(newTask));
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="To Do"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Pressable onPress={onPress}>
        <Icon name="plus" size={32} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CreateTask;
