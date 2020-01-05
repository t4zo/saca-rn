import _ from 'lodash';
import api from 'services/api';
import { Alert } from 'react-native';

import User from 'models/User';
import consts from 'services/consts';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CARDS_CATEGORIES = 'GET_CARDS_CATEGORIES';

export function getCategories() {
  return async function(dispatch: any) {
    try {
      const request = await api.get(`/categories`);
      if (request.status === consts.httpStatusCode.Ok) {
        dispatch({type: GET_CATEGORIES, payload: request.data});
      }
    } catch (error) {
      if (error.response.status == consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }
  };
}

export function getUserCategories(user: User) {
  return async function(dispatch: any) {
    try {
      const request = await api.get(`/categories/${user.id}`);

      if (request.status === consts.httpStatusCode.Ok) {
        dispatch({type: GET_CARDS_CATEGORIES, payload: request.data});
      }
    } catch (error) {
      if (error.response.status == consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }
  };
}
