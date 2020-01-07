import {StyleSheet} from 'react-native';
import colors from 'styles/colors';
import consts from 'services/consts';

export default StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  modalImage: {
    width: consts.image.width,
    height: consts.image.height,
    alignSelf: 'center',
    borderColor: colors.primary,
    borderWidth: 1
  },
  textInputContainer: {
    marginHorizontal: 50,
    marginBottom: 50,
  },
  actionImageButtons: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginHorizontal: 50
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
  },
  buttonModalContainer: {
    alignContent: 'center',
    marginVertical: 5,
    borderRadius: 5,
    padding: 5
  },
  buttonCardCapturar: {
    fontSize: 20,
    color: colors.primary,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  buttonCardEnviar: {
    backgroundColor: colors.primary,
    fontSize: 20,
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
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});
