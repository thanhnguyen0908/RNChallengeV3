import React, { useEffect } from 'react';
import { View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { getRandomColor } from '../constants';
import { styles } from '../styles';
import { ItemProps } from '../type';

export const Item = ({ index }: ItemProps) => {
  // state
  const progress = useSharedValue(0);
  const width = useDerivedValue(() =>
    interpolate(progress.value, [0, 0.5, 1], [90, 0, 90]),
  );

  const translateXLeftDot = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, 100]),
  );

  const translateXRightDot = useDerivedValue(() =>
    interpolate(progress.value, [0, 1], [0, -100]),
  );

  const rightDotZIndex = useSharedValue(1);

  // style
  const lineStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const leftDotStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXLeftDot.value }],
  }));

  const rightDotStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateXRightDot.value }],
    zIndex: rightDotZIndex.value,
  }));

  //   effect
  useAnimatedReaction(
    () => progress.value,
    (v, prev) => {
      if (v === prev) {
        return;
      }
      if (v === 0) {
        rightDotZIndex.value = 1;
      }
      if (v === 1) {
        rightDotZIndex.value = -1;
      }
    },
  );

  useEffect(() => {
    progress.value = withDelay(
      index * 100,
      withRepeat(withTiming(1, { duration: 600 }), -1, true),
    );
  }, []);

  // render
  return (
    <View style={[styles.wrapItem]}>
      <Animated.View style={[styles.line, lineStyle]} />
      <Animated.View
        style={[
          styles.dot,
          styles.leftDot,
          { backgroundColor: getRandomColor() },
          leftDotStyle,
        ]}
      />
      <Animated.View
        style={[
          styles.dot,
          styles.rightDot,
          { backgroundColor: getRandomColor() },
          rightDotStyle,
        ]}
      />
    </View>
  );
};
