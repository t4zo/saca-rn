import React from 'react';
import {TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import colors from 'styles/colors';
import styles from './styles';

interface IAddButton {
  openModal: () => void;
}

export default function AddButton({openModal}: IAddButton) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => openModal()}>
      <Icon name="plus" size={20} color={colors.white} />
    </TouchableOpacity>
  );
}
