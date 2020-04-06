import {StyleSheet, Dimensions} from 'react-native';
import Colors from 'utils/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: Colors.white,
  },
  categoryName: {
    marginLeft: 50
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePicture: {},
  sendPicture: {},
  removeMessageContainer: {
    paddingBottom: 30,
    paddingLeft: 20,
    maxWidth: Dimensions.get('window').width / 1.25,
  },
  removeMessage: {
    fontWeight: '600',
  },
});
