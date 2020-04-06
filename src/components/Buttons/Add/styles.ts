import {StyleSheet} from 'react-native';
import Colors from 'utils/Colors';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
});
