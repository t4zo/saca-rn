import {StyleSheet} from 'react-native';
import Colors from 'utils/Colors';

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
    marginBottom: 10
  },
  capture: {
    flex: 0,
    backgroundColor: Colors.primary,
    margin: 20,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'flex-end',
  },
  captureText: {
    color: Colors.white,
  },
  camera: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});
