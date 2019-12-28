import {combineReducers} from 'redux';

import user from 'reducers/UserReducer';
import categories from 'reducers/CategoriesReducer';

export default combineReducers({
  user,
  categories,
});
