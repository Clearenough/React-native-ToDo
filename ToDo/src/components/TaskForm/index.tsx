import React from 'react';
import {useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Animated, {runOnJS, withTiming} from 'react-native-reanimated';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

interface TaskFormProps {
  handler: (item: string) => void;
  inputText?: string;
}

function TaskForm({handler, inputText}: TaskFormProps) {
  const [_, setIsFocused] = useState(false);
  const [text, setText] = useState(() => {
    if (inputText) {
      return inputText;
    }
    return '';
  });

  const inputBackgroundColor = useSharedValue(0.05);
  const iconOpacity = useSharedValue(0);

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: `rgba(0,0,0, ${inputBackgroundColor.value})`,
    };
  });

  const opacity = useAnimatedStyle(() => {
    return {
      opacity: iconOpacity.value,
    };
  });

  function onAdd() {
    handler(text);
    setText('');
  }

  function onClear() {
    iconOpacity.value = withTiming(0, {duration: 300});
    setText('');
  }

  function onChangeText(inputValue: string) {
    setText(inputValue);
    if (inputValue) {
      iconOpacity.value = withTiming(1, {duration: 300});
      return null;
    }
    iconOpacity.value = withTiming(0, {duration: 300});
  }

  function changeIsFocused() {
    setIsFocused(value => !value);
  }

  function onFocus() {
    inputBackgroundColor.value = withTiming(0.2, {duration: 300}, () => {
      runOnJS(changeIsFocused)();
    });
  }

  function onBlur() {
    inputBackgroundColor.value = withTiming(0.05, {duration: 300}, () => {
      runOnJS(changeIsFocused)();
    });
  }

  return (
    <Animated.View style={[styles.container, backgroundColor]}>
      <TextInput
        placeholder="To Do"
        onChangeText={onChangeText}
        defaultValue={text}
        style={[styles.input]}
        keyboardType="ascii-capable"
        onFocus={() => {
          onFocus();
        }}
        onBlur={() => {
          onBlur();
        }}
      />
      <View style={styles.iconsContainer}>
        <Animated.View style={opacity}>
          <Pressable onPress={onClear}>
            <Icon name="delete" size={16} />
          </Pressable>
        </Animated.View>

        <Pressable onPress={onAdd}>
          <Icon name="plus" size={16} />
        </Pressable>
      </View>
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
  iconsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    fontSize: 16,
    maxWidth: '80%',
  },
});

export default TaskForm;
