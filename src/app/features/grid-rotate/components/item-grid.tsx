import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useGridContext} from '../constant';
import {styles} from '../styles';
import {ItemGridProps} from '../type';

export const ItemGrid = ({height, uri, width}: ItemGridProps) => {
  // state
  const {rotate} = useGridContext();

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${-rotate.value}deg`}, {scale: 2}],
  }));

  // render
  return (
    <View style={[styles.baseItem, {width, height}]}>
      <Animated.View style={[StyleSheet.absoluteFillObject, imageStyle]}>
        <FastImage
          style={[StyleSheet.absoluteFillObject]}
          resizeMode={'cover'}
          source={{
            uri,
          }}
        />
      </Animated.View>
    </View>
  );
};