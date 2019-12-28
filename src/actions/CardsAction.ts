import { Alert } from 'react-native';
import _ from 'lodash';
import api from 'services/api';
import Card from 'models/Card';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const REMOVE_CARD = 'REMOVE_CARD';

export function sendCard(card: Card) {
  return async function(dispatch: any, getState: any) {
    try {
      const {user} = getState();

      const {data} = await api.post(`/cards/${user.id}`, {
        name: card.name,
        categoryID: 1,
        base64: card.base64,
      });

      if (!_.isEmpty(data)) {
        dispatch({type: GET_CATEGORIES, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert('Erro ao enviar imagem');
      }
    }
  };
}

export function removeCard(card: Card) {
  return async function(dispatch: any, getState: any) {
    try {
      const {user} = getState();

      const {data} = await api.delete(`/Cards/${user.id}/${card.id}`);

      if (!_.isEmpty(data)) {
        dispatch({type: REMOVE_CARD, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert(error.response.data);
      }
    }
  };
}
