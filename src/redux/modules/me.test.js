import reducer, { actions, defaultState, types } from './me';

describe('me redux module', () => {
  describe('action creators', () => {
    test('fetchMe action', () => {
      const action = actions.fetchMe();
      expect(action.type).toBe(types.FETCH_ME);
      expect(action.payload).toBeUndefined();
    });

    test('putMe action', () => {
      const action = actions.updateMe({ test: 'test' });
      const me = { test: 'test' };
      expect(action.type).toBe(types.UPDATE_ME);
      expect(action.payload).toEqual(me);
    });
  });

  describe('reducers', () => {
    test('initializes with default state', () => {
      expect(reducer(undefined, {})).toBe(defaultState);
    });

    test('FETCH_ME sets state to load', () => {
      const action = actions.fetchMe();
      const state = reducer(defaultState, action);
      expect(state.loading).toBeTruthy();
      expect(state.errors).toHaveLength(0);
    });

    test('FETCH_ME_ERROR', () => {
      const errors = ['no worky'];
      const action = actions.fetchMeError(errors);
      const before = { ...defaultState, loading: true, errors: [] };
      const after = reducer(before, action);

      expect(after.loading).toBeFalsy();
      expect(after.errors).toHaveLength(1);
      expect(after.errors).toContain(errors[0]);
    });

    test('SET_ME', () => {
      const me = { test: 'test' };
      const action = actions.setMe(me);
      const before = { ...defaultState, loading: true, errors: [], data: {} };
      const after = reducer(before, action);

      expect(after.data).toBeDefined();
      expect(after.data).toEqual(me);
      expect(after.loading).toBeFalsy();
      expect(after.errors).toHaveLength(0);
    });

    test('UPDATE_ME does not change state', () => {
      const result = { displayName: 'test' };
      const action = actions.updateMe(result);
      const state = reducer(defaultState, action);

      expect(state).toEqual(state);
    });
  });
});
