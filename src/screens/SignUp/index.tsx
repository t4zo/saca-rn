import React, {useState} from 'react';
import {
  Alert,
  Image,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import _ from 'lodash';

// import { NavigationInjectedProps, withNavigation } from 'react-navigation';

import { useDispatch, useSelector } from 'react-redux';
import userAction from 'actions/UserAction';

import Reducers from 'models/Reducers';
import User from 'models/User';

import Consts from 'utils/Consts';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

// function SignUp(props: NavigationInjectedProps) {
function SignUp() {
  const textInput: any = {};

  const dispatch = useDispatch();
  
  const user = useSelector<Reducers, User>(state => state.user);

  const [userDTO, setUserDTO] = useState<User>(new User());

  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/logo.png')}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_email"
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType = { "next" }
            onSubmitEditing={() => {
              focusNextTextInput("two");
            }}
            blurOnSubmit={false}
            editable={_.isEmpty(user)}
            style={styles.textInput}
            onChangeText={updateEmail}
            placeholder="exemplo@email.com"
            value={userDTO.email}
            ref={input => {
              textInput["one"] = input;
            }}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_nome"
            returnKeyType = { "next" }
            onSubmitEditing={() => {
              focusNextTextInput("three");
            }}
            blurOnSubmit={false}
            editable={_.isEmpty(user)}
            style={styles.textInput}
            onChangeText={updateName}
            placeholder="Mariana da Silva"
            value={userDTO.name}
            ref={input => {
              textInput["two"] = input;
            }}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_senha"
            autoCapitalize='none'
            autoCompleteType='password'
            autoCorrect={false}
            returnKeyType = { "next" }
            onSubmitEditing={() => {
              focusNextTextInput("four");
            }}
            blurOnSubmit={false}
            editable={_.isEmpty(user)}
            style={styles.textInput}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={updatePassword}
            placeholder="*********"
            value={userDTO.password}
            ref={input => {
              textInput["three"] = input;
            }}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_confirmarSenha"
            autoCapitalize='none'
            autoCompleteType='password'
            autoCorrect={false}
            onSubmitEditing={(e) =>  {
              updateConfirmPassword(e.nativeEvent.text)
              _signUp();
            }}
            returnKeyType = { "done" }
            editable={_.isEmpty(user)}
            style={styles.textInput}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={updateConfirmPassword}
            placeholder="*********"
            value={userDTO.confirmPassword}
            ref={input => {
              textInput["four"] = input;
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {_.isEmpty(user) && (
          <Button icon="login-variant" mode="contained" onPress={_signUp}>
            Registrar
          </Button>
        )}
      </View>
    </ScrollView>
  );

  function focusNextTextInput(id: any) {
    textInput[id].focus();
  }

  function updateEmail(value: string) {
    setUserDTO({...userDTO, email: value});
  }

  function updateName(value: string) {
    setUserDTO({...userDTO, name: value});
  }

  function updatePassword(value: string) {
    setUserDTO({...userDTO, password: value});
  }

  function updateConfirmPassword(value: string) {
    setUserDTO({...userDTO, confirmPassword: value});
  }

  async function _signUp() {
    if (userDTO.password !== userDTO.confirmPassword) {
      Alert.alert('As senhas não conferem');
    } else {
      const isUserSigningUp = await dispatch(userAction.signUp(userDTO));

      // @ts-ignore
      if(isUserSigningUp) {
        navigation.navigate(Consts.screens.Home);
        clearUserDto();
      }
    }
  }

  function clearUserDto() {
    setUserDTO(new User());
  }
}

export default SignUp;