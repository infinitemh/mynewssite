import * as ActionTypes from "./ActionTypes";
import { createFilteredRequest } from "../shared/filters";
// this file is ignored in git. create the file and export myAPIKey accodingly.
import { myAPIKey } from "../shared/apikeys";

export const fetchArticles = (country = "us", category = "general") => (
  dispatch
) => {
  dispatch(articlesLoading());
  const req = createFilteredRequest(country, category);

  return fetch(req, {
    headers: {
      "X-Api-Key": myAPIKey,
    },
  })
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
