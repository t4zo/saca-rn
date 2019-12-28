import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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

import {userIsEmpty} from '../../services/auth';

import User from '../../models/User';

import styles from './styles';

import {signIn, signOut, remove} from '../../actions/UserAction';

export default function SignIn() {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);

  const [userDTO, setUserDTO] = useState<User>();

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
        style={{width: 70, height: 70}}
        source={require('../../img/logo.png')}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signIn_email"
            editable={userIsEmpty(user)}
            style={styles.textInput}
            onChangeText={updateEmail}
            placeholder="Informe o email"
            value={userDTO?.email}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signIn_senha"
            editable={userIsEmpty(user)}
            style={styles.textInput}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={updatePassword}
            placeholder="Informe a senha"
            value={userDTO?.password}
          />
        </View>
        {userIsEmpty(user) ? (
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
      <View>
        {userIsEmpty(user) ? (
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

  function updateEmail(value: string) {
    setUserDTO({...userDTO, email: value});
  }

  function updatePassword(value: string) {
    setUserDTO({...userDTO, password: value});
  }

  async function _signIn() {
    await dispatch(signIn({email: userDTO?.email, password: userDTO?.password}));
  }

  async function _signOut() {
    await dispatch(signOut());
    clearUserDto();
  }

  function clearUserDto() {
    setUserDTO(new User());
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

  function recuperarSenha() {}
}
