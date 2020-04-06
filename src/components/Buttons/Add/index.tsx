import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';

import Colors from 'utils/Colors';
import Consts from 'utils/Consts';
import styles from './styles';

function Add({ screen }: any) {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(screen)}>
      <Icon name="plus" size={20} color={Colors.white} />
    </TouchableOpacity>
  );
}

export default Add;
