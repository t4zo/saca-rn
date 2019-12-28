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

import {useDispatch, useSelector} from 'react-redux';
import {signIn, signOut, remove} from '../../actions/UserAction';

import User from '../../models/User';

import styles from './styles';
import Reducers from 'src/models/Reducers';

export default function SignIn() {
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
        source={require('../../img/logo.png')}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signIn_email"
            editable={_.isEmpty(user)}
            style={styles.textInput}
            onChangeText={updateEmail}
            placeholder="exemplo@email.com"
            value={userDTO.email}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signIn_senha"
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
      <View>
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

  function updateEmail(value: string) {
    setUserDTO({...userDTO, email: value});
  }

  function updatePassword(value: string) {
    setUserDTO({...userDTO, password: value});
  }

  async function _signIn() {
    await dispatch(signIn({email: userDTO.email, password: userDTO.password}));
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

  // TODO
  function recuperarSenha() {}
}
