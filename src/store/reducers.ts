import {combineReducers} from 'redux';

import user from 'reducers/UserReducer';
import categories from 'reducers/CategoriesReducer';
import loading from 'reducers/LoadingReducer';

export default combineReducers({
  user,
  categories,
  loading,
});
