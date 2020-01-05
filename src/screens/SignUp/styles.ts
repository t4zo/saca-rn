import {StyleSheet, Dimensions} from 'react-native';
import colors from 'styles/colors';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    marginVertical: 10,
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
    marginVertical: 10,
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
