import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'utils/Colors';

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: Colors.primary,
    alignContent: 'center',
  },
  text: {
    fontSize: 24,
    color: Colors.white,
    paddingVertical: 6,
    textAlign: 'center',
  },
});
