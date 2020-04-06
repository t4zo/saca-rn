import Category from "models/Category";
import { Alert } from 'react-native';
import Card from 'models/Card';

import categoryAction from 'actions/CategoryAction';

import cardsService from "services/cardService";
import Consts from 'utils/Consts';

const SEND_CARD = 'SEND_CARD';
const REMOVE_CARD = 'REMOVE_CARD';

interface CardsAction {
  type: 'SEND_CARD' | 'REMOVE_CARD';
  payload?: Category[];
}

function send(card: Card) {
  return async function(dispatch: React.Dispatch<any>, getState: any/*() => State*/) {
    
    try {
      const { user } = getState();

      const request = await cardsService.createAsync(user, card);
      
      if (request.status === Consts.httpStatusCode.Ok) {
        categoryAction.getCategoriesFromUser(user);
      }
    } catch (error) {
      if (error.response.status == Consts.httpStatusCode.BadRequest) {
        Alert.alert('Erro ao enviar imagem');
      }
    }

  };
}

function remove(card: Card) {
  return async function(dispatch: React.Dispatch<any>, getState: any) {
    
    try {
      const { user } = getState();

      const request = await cardsService.removeAsync(user, card);

      if (request.status === Consts.httpStatusCode.Ok) {
        categoryAction.getCategoriesFromUser(user);
      }
    } catch (error) {
      if (error.response.status == Consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }

  };
}

export default {
  send,
  remove,
  SEND_CARD,
  REMOVE_CARD,
}
