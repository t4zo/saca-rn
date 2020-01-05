import {Alert} from 'react-native';
import _ from 'lodash';
import api from 'services/api';
import User from 'models/User';
import SignIn from 'models/SignIn';
import consts from 'services/consts';

export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SIGNUP = 'SIGNUP';
export const REMOVE = 'REMOVE';

export function signIn(user: SignIn) {
  return async function(dispatch: any) {
    try {
      const request = await api.post(`/auth/signin`, user);
      if (request.status === consts.httpStatusCode.Ok) {
        dispatch({type: SIGNIN, payload: request.data});
      }

      return true;
    } catch (error) {
      if (error.response.status == consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
        return false;
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
      const request = await api.post(`/auth/signup`, user);

      if (request.status === consts.httpStatusCode.Ok) {
        dispatch({type: SIGNUP, payload: request.data});
      }

      return true;
    } catch (error) {
      if (error.response.status == consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
        return false;
      }
    }
  };
}

export function remove() {
  return async function(dispatch: any, getState: any) {
    const {user} = getState();
    try {
      const request = await api.delete(`/auth/delete/${user.id}`);

      if(request.status === 200) {
        dispatch({type: REMOVE});
      }
    } catch (error) {
      if (error.response.status == consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }
  };
}
