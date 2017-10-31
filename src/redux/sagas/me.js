import { call, put, takeEvery } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { types, actions } from '../modules/me';

export function* updateMeSaga(action) {
  // Call the putProfile helper and once resolved grab errors or the me.
  const { me, errors } = yield call(CoreAPI.putProfile, action.payload);

  if (errors) {
    // If there are errors, put an error action into Redux.
    yield put(actions.fetchMeError(errors));
  } else {
    // Otherwise put set me action into Redux.
    yield put(actions.setMe(me));
  }
}

export function* fetchMeSaga() {
  // Call the fetchProfile helper and once resolve grab errors or me.
  const results = yield call(CoreAPI.fetchProfile, {
    include: 'memberships.team,details',
  });
  const { profile, errors } = results;

  if (errors) {
    // If there are errors, put an error action into Redux.
    yield put(actions.fetchMeError(errors));
  } else {
    // Otherwise put set me action into Redux.
    yield put(actions.setMe(profile));
  }
}

export function* watchMe() {
  // Whenever a FETCH_ME action is heard, execute fetchMeSaga.
  yield takeEvery(types.FETCH_ME, fetchMeSaga);
  // Whenever an UPDATE_ME action is heard, execute updateMeSaga.
  yield takeEvery(types.UPDATE_ME, updateMeSaga);
}
