export const types = {
  FETCH_ME: '@kd/catalog/FETCH_ME',
  FETCH_ME_ERROR: '@kd/catalog/FETCH_ME_ERROR',
  SET_ME: '@kd/catalog/SET_ME',
  UPDATE_ME: '@kd/catalog/UPDATE_ME',
};

export const actions = {
  fetchMe: () => ({ type: types.FETCH_ME }),
  fetchMeError: errors => ({ type: types.FETCH_ME_ERROR, payload: errors }),
  setMe: me => ({ type: types.SET_ME, payload: me }),
  updateMe: () => ({ type: types.UPDATE_ME }),
};

export const defaultState = {
  loading: true,
  data: {},
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_ME:
      return { ...state, loading: true, errors: [] };
    case types.FETCH_ME_ERROR:
      return { ...state, loading: false, errors: action.payload };
    case types.SET_ME:
      return { ...state, loading: false, errors: [], data: action.payload };
    default: return state;
  }
};

export default reducer;
