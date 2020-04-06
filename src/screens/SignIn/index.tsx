import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { useNavigation } from '@react-navigation/native';

import userAction from 'actions/UserAction';

import User from 'models/User';

import Reducers from 'models/Reducers';
import Consts from 'utils/Consts';
import styles from './styles';
import { Button, TextInput } from 'react-native-paper';

function SignIn() {
  const textInput: any = {};

  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);

  const [userDTO, setUserDTO] = useState<User>(new User());

  const navigation = useNavigation();

  useEffect(() => {
    function userLoggedIn() {
      if (!_.isEmpty(user)) {
        setUserDTO({...user, password: 'Informe a Senha'});
      }
    }

    userLoggedIn();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={require('assets/images/logo.png')}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signIn_email"
            mode="outlined"
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType = { "next" }
            onSubmitEditing={() => focusNextTextInput("two")}
            blurOnSubmit={false}
            editable={_.isEmpty(user)}
            onChangeText={updateEmail}
            label="Email"
            value={userDTO.email}
            ref={input => textInput["one"] = input}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signIn_senha"
            mode="outlined"
            autoCapitalize='none'
            autoCompleteType='password'
            autoCorrect={false}
            returnKeyType = { "done" }
            onSubmitEditing={(e) =>  {
              updatePassword(e.nativeEvent.text)
              _signIn();
            }}
            ref={input => textInput["two"] = input}
            editable={_.isEmpty(user)}
            style={styles.textInput}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={updatePassword}
            label="Senha"
            value={userDTO.password}
          />
        </View>
        {_.isEmpty(user) ? (
          <View>
            <TouchableHighlight
              onPress={recuperarSenha}>
              <Text style={styles.recuperarSenha}>Esqueci a senha</Text>
            </TouchableHighlight>
          </View>
        ) : (
          <View>
            <TouchableHighlight
              onPress={_remove}>
              <Text style={styles.recuperarSenha}>Remover Conta</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        {_.isEmpty(user) ? (
          <Button icon="login-variant" mode="contained" onPress={_signIn}>
            Entrar
          </Button>
        ) : (
          <Button icon="minus" mode="contained" onPress={_signOut}>
            <Text>Sair</Text>
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

  function updatePassword(value: string) {
    setUserDTO({...userDTO, password: value});
  }

  async function _signIn() {
    const isUserSigningIn = await dispatch(userAction.signIn({email: userDTO.email, password: userDTO.password}));
    
    // @ts-ignore
    if(isUserSigningIn) {
      navigation.navigate(Consts.screens.Home);
    }
  }

  async function _signOut() {
    await dispatch(userAction.signOut());
    clearUserDto();
  }

  function clearUserDto() {
    const _user = new User();
    _user.email = user.email;
    _user.password = '';
    setUserDTO(_user);
  }

  function _remove() {
    Alert.alert(
      'Remover Conta?',
      'Tem certeza que deseja remover a conta atual?',
      [
        {text: 'Não'},
        {
          text: 'Sim',
          onPress: async () => {
            await dispatch(userAction.remove());
            clearUserDto();
          },
        },
      ],
    );
  }

  // TODO
  function recuperarSenha() {}
}

// export default withNavigation(SignIn);
export default SignIn;