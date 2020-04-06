const SET_LOADING = 'SET_LOADING';
const SET_LOADING_TRUE = 'SET_LOADING_TRUE';
const SET_LOADING_FALSE = 'SET_LOADING_FALSE';

export interface ILoadingAction {
  type: 'SET_LOADING';
  payload: boolean;
}

function setLoading(flag: string) {
  return function(dispatch: React.Dispatch<ILoadingAction>) {

    switch (flag) {
      case SET_LOADING_TRUE:
        dispatch({ type: SET_LOADING, payload: true });
        break;

      case SET_LOADING_FALSE:
        dispatch({ type: SET_LOADING, payload: false });
        break;
    };
    
  };
};

export default {
  setLoading,
  SET_LOADING,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
}