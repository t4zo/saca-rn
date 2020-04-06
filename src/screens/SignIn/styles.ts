import {StyleSheet} from 'react-native';
import Colors from 'utils/Colors';

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
  recuperarSenha: {
    color: '#BB2222',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#555555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {},
  buttonText: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    fontSize: 16,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 45,
    textAlign: 'center',
  },
});
