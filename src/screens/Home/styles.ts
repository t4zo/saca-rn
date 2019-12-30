import {StyleSheet, Dimensions} from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.primary,
    height: 50,
    borderWidth: 1,
    borderColor: colors.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: colors.white,
  },
  activityIndicator: {
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
