import { SET_LOADING_TRUE, SET_LOADING_FALSE } from "actions/LoadingAction";

export default function CategoriesReducer(state = false, {type, payload}: any) {
  switch (type) {
    case SET_LOADING_TRUE:
      return true;

    case SET_LOADING_FALSE:
      return false;

    default:
      return state;
  }
}
