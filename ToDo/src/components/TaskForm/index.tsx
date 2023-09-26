import React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface TaskFormProps {
  handler: (item: string) => void;
  inputText?: string;
}

function TaskForm({handler, inputText}: TaskFormProps) {
  const [text, setText] = useState(() => {
    if (inputText) {
      return inputText;
    }
    return '';
  });

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
        style={styles.input}
        keyboardType="ascii-capable"
      />
      <Pressable onPress={onPress}>
        <Icon name="plus" size={16} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 1,
  },
  input: {
    fontSize: 16,
    maxWidth: '80%',
  },
});

export default TaskForm;
