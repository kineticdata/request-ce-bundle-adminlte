import { call, put, takeEvery } from 'redux-saga/effects';
import { CoreAPI } from 'react-kinetic-core';

import { types, actions } from '../modules/space';

export function* fetchSpaceSaga() {
  const { space, serverError } = yield call(CoreAPI.fetchSpace, {
    include: 'attributes,kapps,kapps.attributes',
  });

  if (serverError) {
    // We should do something here?
  } else {
    yield put(actions.setSpace(space));
  }
}

export function* watchSpace() {
  yield takeEvery(types.FETCH_SPACE, fetchSpaceSaga);
}
