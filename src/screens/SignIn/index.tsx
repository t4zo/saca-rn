import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import _ from 'lodash';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import {useDispatch, useSelector} from 'react-redux';
import {signIn, signOut, remove} from 'actions/UserAction';

import User from 'models/User';

import Reducers from 'models/Reducers';
import consts from 'services/consts';
import styles from './styles';

function SignIn(props: NavigationInjectedProps) {
  const textInput: any = {};

  const dispatch = useDispatch();

  const user = useSelector<Reducers, User>(state => state.user);

  const [userDTO, setUserDTO] = useState<User>(new User());

  useEffect(() => {
    function userLoggedIn() {
      if (!_.isEmpty(user)) {
        setUserDTO({...user, password: '*********'});
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
            key="signIn_senha"
            autoCapitalize='none'
            autoCompleteType='password'
            autoCorrect={false}
            returnKeyType = { "done" }
            onSubmitEditing={(e) =>  {
              updatePassword(e.nativeEvent.text)
              _signIn();
            }}
            ref={input => {
              textInput["two"] = input;
            }}
            editable={_.isEmpty(user)}
            style={styles.textInput}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={updatePassword}
            placeholder="*********"
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
          <TouchableHighlight onPress={_signIn} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableHighlight>
        ) : (
          <TouchableHighlight onPress={_signOut} style={styles.button}>
            <Text style={styles.buttonText}>Sair</Text>
          </TouchableHighlight>
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
    const isUserSigningIn = await dispatch(signIn({email: userDTO.email, password: userDTO.password}));
    
    // @ts-ignore
    if(isUserSigningIn) {
      props.navigation.navigate(consts.screens.Home);
    }
  }

  async function _signOut() {
    await dispatch(signOut());
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
            await dispatch(remove());
            clearUserDto();
          },
        },
      ],
    );
  }

  // TODO
  function recuperarSenha() {}
}

export default withNavigation(SignIn);