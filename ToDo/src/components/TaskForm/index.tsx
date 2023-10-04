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
  const iconOpacity = useRef(new Animated.Value(0)).current;

  const backgroundColor = focusAnim.interpolate({
    inputRange: [0.05, 0.2],
    outputRange: ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.2)'],
  });

  const opacity = iconOpacity.interpolate({
    inputRange: [0.05, 0.4],
    outputRange: [0, 1],
  });

  // useEffect(() => {
  //   Animated.timing(iconOpacity, {
  //     toValue: 1,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // }, [iconOpacity]);

  function onAdd() {
    handler(text);
    setText('');
  }

  function onClear() {
    setText('');
    Animated.timing(iconOpacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  function onChangeText(textInputValue: string) {
    Animated.timing(iconOpacity, {
      toValue: textInputValue ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setText(textInputValue);
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
        onChangeText={onChangeText}
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
      <View style={styles.iconsContainer}>
        <Animated.View
          style={{
            opacity,
          }}>
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
