import LoadingAction, { ILoadingAction } from "actions/LoadingAction";

export default function LoadingReducer(state = false, { type, payload }: ILoadingAction) {
  
  switch (type) {
    case LoadingAction.SET_LOADING:
      return payload;

    default:
      return state;
  };

}
