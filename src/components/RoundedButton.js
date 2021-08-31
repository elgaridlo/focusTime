import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import {fontSizes, paddingSizes} from '../utils/size'

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text style={[styles(size).text]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = (size) =>
  StyleSheet.create({
    radius: {
      borderRadius: size / 2,
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#ffff',
      borderWidth: 2,
    },
    text: { color: '#ffff', fontSize: size/3 },
  });
