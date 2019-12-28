import _ from 'lodash';
import api from '../services/api';
import { Alert } from 'react-native';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const GET_CARDS_CATEGORIES = 'GET_CARDS_CATEGORIES';

export function getCategories() {
  return async function(dispatch: any) {
    try {
      const {data} = await api.get(`/categories`);
      if (!_.isEmpty(data)) {
        dispatch({type: GET_CATEGORIES, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert(error.response.data);
      }
    }
  };
}

export function getCardsCategories(usuario: any) {
  return async function(dispatch: any) {
    try {
      const {data} = await api.get(`/categories/${usuario.id}`);

      if (!_.isEmpty(data)) {
        dispatch({type: GET_CARDS_CATEGORIES, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert(error.response.data);
      }
    }
  };
}