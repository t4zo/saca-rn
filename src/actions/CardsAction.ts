import { Alert } from 'react-native';
import _ from 'lodash';
import api from 'services/api';
import Card from 'models/Card';

import { getUserCategories } from './CategoriesAction';
import consts from 'services/consts';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const REMOVE_CARD = 'REMOVE_CARD';

export function sendCard(card: Card) {
  return async function(dispatch: any, getState: any) {
    try {
      const {user} = getState();

      const request = await api.post(`/cards/${user.id}`, {
        name: card.name,
        categoryId: 1,
        base64: card.base64,
      });

      
      if (request.status === consts.httpStatusCode.Ok) {
        dispatch(await getUserCategories(user));
      }
    } catch (error) {
      if (error.response.status == consts.httpStatusCode.BadRequest) {
        Alert.alert('Erro ao enviar imagem');
      }
    }
  };
}

export function removeCard(card: Card) {
  return async function(dispatch: any, getState: any) {
    try {
      const {user} = getState();

      const request = await api.delete(`/cards/${user.id}/${card.id}`);

      if (request.status === consts.httpStatusCode.Ok) {
        dispatch(await getUserCategories(user));
      }
    } catch (error) {
      if (error.response.status == consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }
  };
}
