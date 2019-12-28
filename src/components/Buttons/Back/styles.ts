import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  buttonModalContainer: {
    backgroundColor: colors.primary,
    alignContent: 'center',
  },
  closeModalText: {
    fontSize: 24,
    color: colors.white,
    paddingVertical: 6,
    textAlign: 'center',
  },
});
