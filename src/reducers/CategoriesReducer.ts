import categoryAction, { ICategoryAction } from 'actions/CategoryAction';

export default function CategoriesReducer(state = [], { type, payload }: ICategoryAction) {
  switch (type) {
    case categoryAction.GET_CATEGORIES:
      return [...payload];

    case categoryAction.GET_CARDS_CATEGORIES:
      return [...payload];

    default:
      return state;
  }
}
