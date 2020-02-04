import consts from 'services/consts';

export const SET_LOADING_TRUE = 'SET_LOADING_TRUE';
export const SET_LOADING_FALSE = 'SET_LOADING_FALSE';

export function setLoading(type: string) {
  return function(dispatch: any) {
    
    if(type === consts.loading.true) {
      dispatch({type: SET_LOADING_TRUE});
    } else if (type === consts.loading.false) {
      dispatch({type: SET_LOADING_FALSE});
    }
    
  };
};
