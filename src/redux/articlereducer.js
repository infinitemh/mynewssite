import * as ActionTypes from "./ActionTypes";

export const Articles = (
  state = { isLoading: true, errMess: null, articles: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_ARTICLES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        // spread because payload is in {articles:[]} form
        ...action.payload,
      };
    case ActionTypes.ARTICLES_LOADING:
      return { ...state, isLoading: true, errMess: null, articles: [] };
    case ActionTypes.ARTICLES_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
