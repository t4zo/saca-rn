import userAction, { IUserAction } from 'actions/UserAction';

export default function UserReducer(state = {}, { type, payload }: IUserAction) {
  switch (type) {
    case userAction.SIGNIN:
      return {
        ...payload,
      };

    case userAction.SIGNOUT:
      return {};

    case userAction.SIGNUP:
      return {
        ...payload,
      };

    case userAction.REMOVE:
      return {};

    default:
      return state;
  }
}
