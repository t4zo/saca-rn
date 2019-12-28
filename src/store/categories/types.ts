import { GET_CATEGORIES, GET_CARDS_CATEGORIES } from "actions/CategoriesAction";

import Category from "models/Category";

import Card from "models/Card";

interface GetCategoriesAction {
  type: typeof GET_CATEGORIES
  payload: Category
}

interface GetCardsCategoriesAction {
  type: typeof GET_CARDS_CATEGORIES
  payload: Card[]
}

export type CategoriesActionTypes = GetCategoriesAction | GetCardsCategoriesAction;
