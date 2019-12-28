import {SIGNIN, SIGNOUT, SIGNUP, REMOVE} from '../actions/UserAction';

export default function UserReducer(state = {}, {type, payload}: any) {
  switch (type) {
    case SIGNIN:
      return {
        ...payload,
      };

    case SIGNOUT:
      return {};

    case SIGNUP:
      return {
        ...payload,
      };

    case REMOVE:
      return {};

    default:
      return state;
  }
}
