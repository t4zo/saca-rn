import _ from 'lodash';
import User from 'src/models/User';

export function userIsEmpty(user: User) {
  return _.isUndefined(user?.id);
}
