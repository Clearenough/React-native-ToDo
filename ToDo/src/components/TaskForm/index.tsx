import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import {Animated, Pressable, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface TaskFormProps {
  handler: (item: string) => void;
  inputText?: string;
}

function TaskForm({handler, inputText}: TaskFormProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(() => {
    if (inputText) {
      return inputText;
    }
    return '';
  });

  const focusAnim = useRef(new Animated.Value(0.05)).current;

  const backgroundColor = focusAnim.interpolate({
    inputRange: [0.05, 0.2], // Map 0.05 to 0 and 0.4 to 1
    outputRange: ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.2)'], // Transparent to opaque
  });

  // useEffect(() => {
  //   Animated.timing(focusAnim, {
  //     toValue: 0.2,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // }, [focusAnim, isFocused]);

  function onPress() {
    handler(text);
    setText('');
  }

  function onFocus() {
    Animated.timing(focusAnim, {
      toValue: 0.2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function onBlur() {
    Animated.timing(focusAnim, {
      toValue: 0.05,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}>
      <TextInput
        placeholder="To Do"
        onChangeText={setText}
        defaultValue={text}
        style={[styles.input]}
        keyboardType="ascii-capable"
        onFocus={() => {
          setIsFocused(true);
          onFocus();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur();
        }}
      />
      <Pressable onPress={onPress}>
        <Icon name="plus" size={16} />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    border: 1,
    padding: 10,
  },
  input: {
    fontSize: 16,
    maxWidth: '80%',
  },
});

export default TaskForm;
