import React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
// import {ITask} from '../../types/common';

interface TaskFormProps {
  handler: (item: string) => void;
}

function TaskForm({handler}: TaskFormProps) {
  const [text, setText] = useState('');

  function onPress() {
    handler(text);
    setText('');
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

export default TaskForm;
