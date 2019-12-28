import {
  GET_CATEGORIES,
  GET_CARDS_CATEGORIES,
} from '../actions/CategoriesAction';

export default function CategoriesReducer(state = [], {type, payload}: any) {
  switch (type) {
    case GET_CATEGORIES:
      return [...payload];

    case GET_CARDS_CATEGORIES:
      return [...payload];

    default:
      return state;
  }
}
