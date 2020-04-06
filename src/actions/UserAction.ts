import { Alert } from 'react-native';
import User from 'models/User';
import SignIn from 'models/SignIn';
import Consts from 'utils/Consts';
import userService from 'services/userService';

export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';
export const SIGNUP = 'SIGNUP';
export const REMOVE = 'REMOVE';

export interface IUserAction {
  type: 'SIGNIN' | 'SIGNOUT' | 'SIGNUP' | 'REMOVE';
  payload?: any;
}

function signIn(user: SignIn) {
  return async function(dispatch: React.Dispatch<IUserAction>) {
    
    try {
      const request = await userService.signIn(user);
      if (request.status === Consts.httpStatusCode.Ok) {
        dispatch({ type: SIGNIN, payload: request.data });
      }

      return true;
    } catch (error) {
      if (error.response.status == Consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
        return false;
      } else {
        Alert.alert(
          'Ocorreu um erro ao conectar, tente novamente em alguns instantes',
        );
      }
    }

  }
}

function signUp(user: User) {
  return async function(dispatch: React.Dispatch<IUserAction>) {
    
    try {
      const request = await userService.signUp(user);

      if (request.status === Consts.httpStatusCode.Ok) {
        dispatch({type: SIGNUP, payload: request.data});
      }

      return true;
    } catch (error) {
      if (error.response.status == Consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
        return false;
      }
    }

  }
}

function signOut() {
  return async function(dispatch: React.Dispatch<IUserAction>) {
    dispatch({ type: SIGNOUT });
  }
}

function remove() {
  return async function(dispatch: React.Dispatch<IUserAction>, getState: any) {
    const { user } = getState();
    try {
      const request = await userService.remove(user);

      if(request.status === 200) {
        dispatch({type: REMOVE});
      }
    } catch (error) {
      if (error.response.status == Consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }
  }
}

export default {
  signIn,
  signUp,
  signOut,
  remove,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  REMOVE,
}
