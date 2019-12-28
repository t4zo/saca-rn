import {StyleSheet, Dimensions} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: Math.round(Dimensions.get('window').height),
    justifyContent: 'space-between',
  },
  modalImage: {
    width: Math.round(Dimensions.get('window').width / 2),
    height: Math.round(Dimensions.get('window').height / 4),
    alignSelf: 'center',
    marginVertical: Math.round(Dimensions.get('window').height / 10),
  },
  modalInputContainer: {
    flex: 1,
  },
  textInputContainer: {
    marginHorizontal: 50,
    marginBottom: 50,
  },
  actionImageButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  buttonModalContainer: {
    backgroundColor: colors.primary,
    alignContent: 'center',
  },
  buttonCardText: {
    fontSize: 18,
    color: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  closeModalText: {
    fontSize: 24,
    color: colors.white,
    paddingVertical: 6,
    textAlign: 'center',
  },
});
