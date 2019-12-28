import _ from 'lodash';
import api from '../services/api';
import Picture from 'src/models/Picture';
import { Alert } from 'react-native';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const REMOVE_PICTURE = 'REMOVE_PICTURE';

export function sendPicture(picture: Picture) {
  return async function(dispatch: any, getState: any) {
    try {
      const {user} = getState();

      const {data} = await api.post(`/pictures/${user.id}`, {
        name: picture.name,
        categoryID: 1,
        base64: picture.base64,
      });

      if (!_.isEmpty(data)) {
        dispatch({type: GET_CATEGORIES, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert('Erro ao enviar imagem');
        // Alert.alert(error.response.data);
      }
    }
  };
}

export function removePicture(picture: Picture) {
  return async function(dispatch: any, getState: any) {
    try {
      const {user} = getState();

      const {data} = await api.delete(`/pictures/${user.id}/${picture.id}`);

      if (!_.isEmpty(data)) {
        dispatch({type: REMOVE_PICTURE, payload: data});
      }
    } catch (error) {
      if (error.response.status == 400) {
        Alert.alert(error.response.data);
      }
    }
  };
}
