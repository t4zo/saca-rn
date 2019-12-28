import { GET_CATEGORIES, GET_CARDS_CATEGORIES } from "src/actions/CategoriesAction";

import Categories from "src/models/Categories";

import Card from "src/models/Card";

interface GetCategoriesAction {
  type: typeof GET_CATEGORIES
  payload: Categories
}

interface GetCardsCategoriesAction {
  type: typeof GET_CARDS_CATEGORIES
  payload: Card[]
}

export type CategoriesActionTypes = GetCategoriesAction | GetCardsCategoriesAction;
