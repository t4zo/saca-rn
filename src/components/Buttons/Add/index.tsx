import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import colors from 'styles/colors';
import styles from './styles';

interface IAdd {
  openModal: () => void;
}

export default function Add({openModal}: IAdd) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => openModal()}>
      <Icon name="plus" size={20} color={colors.white} />
    </TouchableOpacity>
  );
}
