import { List } from 'immutable';
import { Category } from '../../models';

export const types = {
  FETCH_CATEGORIES: '@kd/catalog/FETCH_CATEGORIES',
  SET_CATEGORIES: '@kd/catalog/SET_CATEGORIES',
  SET_CATEGORIES_ERRORS: '@kd/catalog/SET_CATEGORIES_ERRORS',
};

export const actions = {
  fetchCategories: () => ({ type: types.FETCH_CATEGORIES }),
  setCategories: categories => ({ type: types.SET_CATEGORIES, payload: categories }),
  setCategoriesErrors: errors => ({ type: types.SET_CATEGORIES_ERRORS, payload: errors }),
};

export const defaultState = {
  loading: true,
  errors: [],
  data: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_CATEGORIES:
      return { ...state, loading: true, errors: [] };
    case types.SET_CATEGORIES:
      return { ...state, loading: false, errors: [], data: List(action.payload).map(Category) };
    case types.SET_CATEGORIES_ERRORS:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};

export default reducer;
