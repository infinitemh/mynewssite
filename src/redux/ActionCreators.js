import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";
// this file is ignored in git. create the file and export myAPIKey accodingly.
import { myAPIKey } from "../shared/apikeys";

export const fetchArticles = (country = "us", category = "general") => (
  dispatch
) => {
  dispatch(articlesLoading());
  const endpoint = "top-headlines";
  const apiKey = `apiKey=${myAPIKey}`;
  //   const apiKey = ``;
  const combinedFilters = `${"country=" + country}${"&category=" + category}${
    "&" + apiKey
  }`;
  const url = `${baseUrl}${endpoint}?${combinedFilters}`;
  const req = new Request(url);

  return fetch(req)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((articles) => dispatch(addArticles(articles)))
    .catch((error) => dispatch(articlesFailed(error.message)));
};

export const articlesLoading = () => ({
  type: ActionTypes.ARTICLES_LOADING,
});

export const articlesFailed = (errMess) => ({
  type: ActionTypes.ARTICLES_FAILED,
  payload: errMess,
});

export const addArticles = (articles) => ({
  type: ActionTypes.ADD_ARTICLES,
  payload: articles,
});
