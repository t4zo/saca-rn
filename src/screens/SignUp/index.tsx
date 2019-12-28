import React, {useState} from 'react';
import {
  Alert,
  Image,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash';

import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../../actions/UserAction';

import Reducers from 'src/models/Reducers';
import User from '../../models/User';

import styles from './styles';

export default function SignUp() {
  const dispatch = useDispatch();
  
  const user = useSelector<Reducers, User>(state => state.user);

  const [userDTO, setUserDTO] = useState<User>(new User());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={require('../../img/logo.png')}
      />
      <View style={styles.bodyContainer}>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_email"
            editable={_.isEmpty(user)}
            style={styles.textInput}
            onChangeText={updateEmail}
            placeholder="exemplo@email.com"
            value={userDTO.email}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_nome"
            editable={_.isEmpty(user)}
            style={styles.textInput}
            onChangeText={updateName}
            placeholder="Mariana da Silva"
            value={userDTO.name}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_senha"
            editable={_.isEmpty(user)}
            style={styles.textInput}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={updatePassword}
            placeholder="*********"
            value={userDTO.password}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            key="signUp_confirmarSenha"
            editable={_.isEmpty(user)}
            style={styles.textInput}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={updateConfirmPassword}
            placeholder="*********"
            value={userDTO.confirmPassword}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {_.isEmpty(user) && (
          <TouchableHighlight onPress={_signUp} style={styles.button}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableHighlight>
        )}
      </View>
    </ScrollView>
  );

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
      await dispatch(signUp(userDTO));
      setUserDTO(new User());
    }
  }
}
