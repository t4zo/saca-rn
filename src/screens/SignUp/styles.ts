import {StyleSheet, Dimensions} from 'react-native';
import colors from 'saca/src/styles/colors';

export default StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 1.3,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
  },
  bodyContainer: {
    width: '70%',
  },
  textInputContainer: {
    marginVertical: 15,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {},
  buttonText: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    fontSize: 16,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 45,
    textAlign: 'center',
  },
});