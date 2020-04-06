import {StyleSheet} from 'react-native';
import Colors from 'utils/Colors';
import Consts from 'utils/Consts';

export default StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  modalImage: {
    width: Consts.image.width,
    height: Consts.image.height,
    alignSelf: 'center',
    borderColor: Colors.primary,
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
    borderBottomColor: Colors.grey,
  },
  buttonModalContainer: {
    alignContent: 'center',
    marginVertical: 5,
    borderRadius: 5,
    padding: 5
  },
  buttonCardCapturar: {
    fontSize: 20,
    color: Colors.primary,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  buttonCardEnviar: {
    backgroundColor: Colors.primary,
    fontSize: 20,
    color: Colors.white,
    paddingVertical: 8,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  closeModalText: {
    fontSize: 24,
    color: Colors.white,
    paddingVertical: 6,
    textAlign: 'center',
  },
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});
