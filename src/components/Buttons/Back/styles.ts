import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: colors.primary,
    alignContent: 'center',
  },
  text: {
    fontSize: 24,
    color: colors.white,
    paddingVertical: 6,
    textAlign: 'center',
  },
});
