import categoryAction from "actions/CategoryAction";

import Category from "models/Category";

import Card from "models/Card";

interface GetCategoriesAction {
  type: typeof categoryAction.GET_CATEGORIES
  payload: Category
}

interface GetCardsCategoriesAction {
  type: typeof categoryAction.GET_CARDS_CATEGORIES
  payload: Card[]
}

export type CategoriesActionTypes = GetCategoriesAction | GetCardsCategoriesAction;
