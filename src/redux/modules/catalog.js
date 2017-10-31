import axios from 'axios';
import { Map, List } from 'immutable';
import { LOCATION_CHANGE } from 'connected-react-router';
import { Form, Category } from '../../models';

const KAPP_ENDPOINT = `${window.bundle.apiLocation()}/kapps/services`;
const PROFILE_ENDPOINT = `${window.bundle.apiLocation()}/me`;
const CATEGORIES_ENDPOINT = `${KAPP_ENDPOINT}/categories`;
const FORMS_ENDPOINT = `${KAPP_ENDPOINT}/forms`;
const SUBMISSIONS_ENDPOINT = `${KAPP_ENDPOINT}/submissions`;

export const types = {
  FETCH_PROFILE: 'FETCH_PROFILE',
  FETCH_CATEGORIES: 'FETCH_CATEGORIES',
  FETCH_FORMS: 'FETCH_FORMS',
  FETCH_SUBMISSIONS: 'FETCH_SUBMISSIONS',
  CATALOG_SEACH_INPUT: 'CATALOG_SEACH_INPUT',
};

export const actions = {
  fetchProfile: () =>
    ({
      type: types.FETCH_PROFILE,
      payload: axios.get(PROFILE_ENDPOINT),
    }),
  fetchCategories: () =>
    ({
      type: types.FETCH_CATEGORIES,
      payload: axios.get(CATEGORIES_ENDPOINT, { params: { include: 'attributes' } }),
    }),
  fetchForms: () =>
    ({
      type: types.FETCH_FORMS,
      payload: axios.get(FORMS_ENDPOINT, { params: { include: 'categorizations,attributes' } }),
    }),
  fetchSubmissions: username => {
    const q = `values[Requested By] = "${username}"`;
    return ({
      type: types.FETCH_SUBMISSIONS,
      payload: axios.get(SUBMISSIONS_ENDPOINT, { params: { q, include: 'details,values,form' } }),
    });
  },
  catalogSearchInput: searchTerm =>
    ({
      type: types.CATALOG_SEACH_INPUT,
      payload: searchTerm,
    }),
};

const INITIAL_STATE = Map({
  pending: true,
  error: false,
  searchTerm: '',
  categories: null,
  forms: null,
  profile: null,
  submissions: null,
});

const reducer = (state = INITIAL_STATE, action) => {
  // Determines the fetch to which the response action corresponds.
  let setting;
  let data;
  switch (action.type) {
    case types.FETCH_PROFILE:
      setting = 'profile';
      data = action.payload.data;
      break;
    case types.FETCH_CATEGORIES:
      setting = 'categories';
      data = List(action.payload.data.categories).map(Category);
      break;
    case types.FETCH_FORMS:
      setting = 'forms';
      data = List(action.payload.data.forms).map(Form);
      break;
    case types.FETCH_SUBMISSIONS:
      setting = 'submissions';
      data = List(action.payload.data.submissions);
      break;
    case types.CATALOG_SEACH_INPUT:
      return state.set('searchTerm', action.payload);
    case LOCATION_CHANGE:
      return state.set('searchTerm', '');
    default: return state;
  }
  // Update the state with the results of the response action, either setting
  // one of the data properties or setting error to true.
  const updatedState =
    !action.payload.error
      ? state.set(setting, data)
      : state.set('error', true);
  // Return the updated state, also checking to see if pending should be set to
  // false, indicating that all of the responses have been received.
  // We define 'complete' as either: an error has occurred or all of the
  // requests are finished.
  return updatedState.set(
    'pending',
    !updatedState.error && updatedState.some(val => val === null),
  );
};

export default reducer;
