export const types = {
  OPEN_FORM: '@kd/catalog/OPEN_FORM',
  DISMISS_FORM: '@kd/catalog/DISMISS_FORM',
  COMPLETE_FORM: '@kd/catalog/COMPLETE_FORM',
};

export const actions = {
  openForm: form => ({ type: types.OPEN_FORM, payload: form }),
  dismissForm: () => ({ type: types.DISMISS_FORM }),
  completeForm: () => ({ type: types.COMPLETE_FORM }),
};

export const defaultState = {
  form: null,
  completed: false,
};

const reducer = (state = defaultState, { type, payload }) => {
  switch (type) {
    case types.OPEN_FORM:
      return { form: payload, completed: false };
    case types.DISMISS_FORM:
      return defaultState;
    case types.COMPLETE_FORM:
      return { ...state, completed: true };
    default:
      return state;
  }
};

export default reducer;
