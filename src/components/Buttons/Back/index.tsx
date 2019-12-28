import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface IBack {
  onPress: () => void;
  text: string;
}

export default function Back({onPress, text}: IBack) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonModalContainer}>
      <Text style={styles.closeModalText}>{text}</Text>
    </TouchableOpacity>
  );
}
