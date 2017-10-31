export const types = {
  FETCH_SPACE: '@kd/catalog/FETCH_SPACE',
  SET_SPACE: '@kd/catalog/SET_SPACE',
};

export const actions = {
  fetchSpace: () => ({ type: types.FETCH_SPACE }),
  setSpace: space => ({ type: types.SET_SPACE, payload: space }),
};

export const defaultState = {
  data: null,
  loading: true,
  errors: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_SPACE:
      return { ...state, loading: true, errors: [] };
    case types.SET_SPACE:
      return { ...state, loading: false, errors: [], data: action.payload };
    default:
      return state;
  }
};

export default reducer;
