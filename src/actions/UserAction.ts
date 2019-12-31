import {Alert} from 'react-native';
import _ from 'lodash';
import api from 'services/api';
import User from 'models/User';

export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SIGNUP = 'SIGNUP';
export const REMOVE = 'REMOVE';

export function signIn(user: User) {
  return async function(dispatch: any) {
    try {
      const {data} = await api.post(`/auth/signin`, user);
      if (!_.isEmpty(data)) {
        dispatch({type: SIGNIN, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert(error.response.data);
      } else {
        Alert.alert(
          'Ocorreu um erro ao conectar, tente novamente em alguns instantes',
        );
      }
    }
  };
}

export function signOut() {
  return async function(dispatch: any) {
    dispatch({type: SIGNOUT});
  };
}

export function signUp(user: User) {
  return async function(dispatch: any) {
    try {
      const {data} = await api.post(`/auth/signup`, user);

      if (!_.isEmpty(data)) {
        dispatch({type: SIGNUP, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert(error.response.data);
      }
    }
  };
}

export function remove() {
  return async function(dispatch: any, getState: any) {
    const {user} = getState();
    try {
      await api.delete(`/auth/delete/${user.id}`);
      dispatch({type: REMOVE});
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert(error.response.data);
      }
    }
  };
}
