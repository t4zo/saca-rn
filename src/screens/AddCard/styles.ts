import {StyleSheet, Dimensions} from 'react-native';
import colors from 'styles/colors';
import consts from 'services/consts';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    height: Math.round(Dimensions.get('window').height),
    justifyContent: 'space-around',
  },
  modalImage: {
    width: consts.image.width,
    height: consts.image.height,
    alignSelf: 'center',
    borderColor: colors.black,
    borderWidth: 1
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
  loading: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  }
});
