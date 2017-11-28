import { all } from 'redux-saga/effects';
import { watchKinops } from './sagas/kinops';
import { watchCategories } from './sagas/categories';
import { watchForms } from './sagas/forms';
import { watchSubmissions } from './sagas/submissions';
import { watchSubmission, watchSubmissionPoller } from './sagas/submission';
import { watchSubmissionCounts } from './sagas/submissionCounts';

export default function*() {
  yield all([
    watchKinops(),
    watchCategories(),
    watchForms(),
    watchSubmissions(),
    watchSubmission(),
    watchSubmissionPoller(),
    watchSubmissionCounts(),
  ]);
}
