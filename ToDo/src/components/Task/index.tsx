import React, {useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {ITask} from '../../types/common';
import Icon from 'react-native-vector-icons/Feather';
import {useAppDispatch} from '../../hooks/hooks';
import {
  completeTask,
  deleteTask,
  updateTask,
} from '../../store/slices/tasksSlice';
import TaskForm from '../TaskForm';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface TaskProps {
  task: ITask;
}

function Task({task}: TaskProps) {
  const [isUpdateTask, setIsUpdateTask] = useState(false);
  const dispatch = useAppDispatch();

  const {width: windowWidth} = useWindowDimensions();

  const translateX = useSharedValue(0);
  const height = useSharedValue(60);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const textStyles = !task.isCompleted
    ? styles.text
    : [styles.text, styles.completedText];

  function onDelete() {
    dispatch(deleteTask(task.id));
  }

  function onComplete() {
    dispatch(completeTask(task.id));
  }

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: event => {
      if (event.translationX < 0) {
        if (-event.translationX > windowWidth * 0.3) {
          translateX.value = withTiming(-windowWidth);
          height.value = withTiming(0);
          marginVertical.value = withTiming(0);
          opacity.value = withTiming(0, undefined, isFinished => {
            if (isFinished) {
              runOnJS(onDelete)();
            }
          });
        } else {
          translateX.value = withTiming(0);
        }
      } else {
        if (event.translationX > windowWidth * 0.3) {
          opacity.value = withTiming(1, undefined, isFinished => {
            if (isFinished) {
              runOnJS(onComplete)();
            }
          });
        }
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    let iconOpacity;
    if (translateX.value < 0) {
      iconOpacity = withTiming(-translateX.value > windowWidth * 0.3 ? 1 : 0);
    } else {
      iconOpacity = withTiming(translateX.value > windowWidth * 0.3 ? 1 : 0);
    }
    return {opacity: iconOpacity};
  });

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

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
    <Animated.View style={[styles.container, rContainerStyle]}>
      <Animated.View
        style={[
          styles.iconContainer,
          styles.deleteIconContainer,
          rIconContainerStyle,
        ]}>
        <Icon name="delete" size={32} color="red" />
      </Animated.View>
      <Animated.View
        style={[
          styles.iconContainer,
          styles.completeIconContainer,
          rIconContainerStyle,
        ]}>
        <Icon name="check" size={32} color="green" />
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.taskContainer, rStyle]}>
          {isUpdateTask ? (
            <TaskForm handler={onUpdateTask} inputText={task.text} />
          ) : (
            <View style={styles.task}>
              <Text style={textStyles}>{task.text}</Text>
              <Pressable onPress={onPress}>
                <Icon name="edit-2" size={16} />
              </Pressable>
            </View>
          )}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  taskContainer: {
    height: 60,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    padding: 20,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
  },
  iconContainer: {
    top: '35%',
    alignSelf: 'baseline',
    position: 'absolute',
  },
  deleteIconContainer: {
    right: 20,
  },
  completeIconContainer: {
    left: 20,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    maxWidth: '80%',
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
});

export default Task;
