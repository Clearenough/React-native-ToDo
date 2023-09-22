import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Swipeable} from 'react-native-gesture-handler';
import {Task} from '../../types/common';
import Icon from 'react-native-vector-icons/FontAwesome';

interface TaskProps {
  task: Task;
}

function Task({task}: TaskProps) {
  return (
    <Swipeable>
      <View>
        <Text>{task.text}</Text>
        <Pressable>
          <Icon name="pencil" />
        </Pressable>
      </View>
    </Swipeable>
  );
}

export default Task;
