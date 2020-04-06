import { Alert } from 'react-native';

import User from 'models/User';
import Consts from 'utils/Consts';
import categoryService from "services/categoryService";

import Category from "models/Category";

export interface ICategoryAction {
  type: 'GET_CATEGORIES' | 'GET_CARDS_CATEGORIES';
  payload: Category[];
}

const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CARDS_CATEGORIES = 'GET_CARDS_CATEGORIES';

function getAll() {
  return async function(dispatch: React.Dispatch<ICategoryAction>) {
    
    try {
      const request = await categoryService.getAll();
      if (request.status === Consts.httpStatusCode.Ok) {
        dispatch({ type: GET_CATEGORIES, payload: request.data });
      }
    } catch (error) {
      if (error.response.status == Consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }

  }
}

function getCategoriesFromUser(user: User) {
  return async function(dispatch: React.Dispatch<ICategoryAction>) {
    try {
      const request = await categoryService.getCategoriesFromUser(user);

      if (request.status === Consts.httpStatusCode.Ok) {
        dispatch({ type: GET_CARDS_CATEGORIES, payload: request.data });
      }
    } catch (error) {
      if (error.response.status == Consts.httpStatusCode.BadRequest) {
        Alert.alert(error.response.data);
      }
    }
  }
}

export default {
  getAll,
  getCategoriesFromUser,
  GET_CATEGORIES,
  GET_CARDS_CATEGORIES,
}