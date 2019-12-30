import React from 'react';
import {TouchableOpacity} from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import Icon from 'react-native-vector-icons/AntDesign';

import colors from 'styles/colors';
import styles from './styles';
import consts from 'services/consts';

interface IAdd extends NavigationInjectedProps {}

function Add(props: IAdd) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => (props.navigation.navigate(consts.screens.AddCard))}>
      <Icon name="plus" size={20} color={colors.white} />
    </TouchableOpacity>
  );
}

export default withNavigation(Add);
