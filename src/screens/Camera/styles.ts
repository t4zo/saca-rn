import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 60
  },
  capture: {
    flex: 0,
    backgroundColor: colors.primary,
    margin: 20,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  captureText: {
    color: colors.white,
  },
  camera: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  esperando: {
    flex: 1,
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
