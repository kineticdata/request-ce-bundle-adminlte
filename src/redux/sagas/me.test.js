import { put, call } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { fetchMeSaga, updateMeSaga } from './me';

import { actions } from '../modules/me';

// Mock out the bundle object from a dependency.
jest.mock('react-kinetic-core', () => ({
  bundle: {
    apiLocation: () => 'space/app/api/v1',
  },
  MeAPI: { putMe: () => {}, fetchMe: () => {} },
}));

describe('me saga', () => {
  describe('#fetchMeSaga', () => {
    test('when errors it dispatches FETCH_ME_ERROR', () => {
      const response = { errors: ['fake-error'] };

      // Step 1 - trigger the saga - as if watchMe had seen an action.
      const saga = fetchMeSaga();
      // Step 2 - call to fetch the me.
      expect(saga.next().value).toEqual(call(CoreAPI.fetchMe));
      // Step 3 - that call results in an error, dispatch a fetch error action.
      expect(saga.next(response).value).toEqual(put(actions.fetchMeError(response.errors)));
    });

    test('when successful it dispatches SET_ME', () => {
      const response = { me: { name: 'fake-me' } };

      // Step 1 - trigger the saga - as if watchMe had seen an action.
      const saga = fetchMeSaga();
      // Step 2 - call to fetch the me.
      expect(saga.next().value).toEqual(call(CoreAPI.fetchMe));
      // Step 3 - that call response with a me, dispatch a set me action.
      expect(saga.next(response).value).toEqual(put(actions.setMe(response.me)));
    });
  });

  describe('#updateMeSaga', () => {
    test('when errors it dispatches FETCH_ME_ERROR', () => {
      const fakeMe = { name: 'foo' };
      const watchAction = actions.setMe(fakeMe);
      const response = { errors: ['fake-error'] };

      // Step 1 - trigger the saga - as if watchMe had seen an action.
      const saga = updateMeSaga(watchAction);
      // Step 2 - call to update the me.
      expect(saga.next().value).toEqual(call(CoreAPI.putMe, watchAction.payload));
      // Step 2 - that call results in an error, dispatch a fetch error action.
      expect(saga.next(response).value).toEqual(put(actions.fetchMeError(response.errors)));
    });

    test('when successful it dispatches SET_ME', () => {
      const fakeMe = { name: 'foo' };
      const watchAction = actions.setMe(fakeMe);
      const response = { me: fakeMe };

      // Step 1 - trigger the saga - as if watchMe had seen an action.
      const saga = updateMeSaga(watchAction);
      // Step 2 - call to update the me.
      expect(saga.next().value).toEqual(call(CoreAPI.putMe, watchAction.payload));
      // Step 2 - that call responds with a me, dispatch a fetch error action.
      expect(saga.next(response).value).toEqual(put(actions.setMe(response.me)));
    });
  });
});
