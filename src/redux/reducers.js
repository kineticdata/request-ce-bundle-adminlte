import layoutReducer from './modules/layout';
import kinopsReducer from './modules/kinops';

import categoriesReducer from './modules/categories';
import formsReducer from './modules/forms';
import modalFormReducer from './modules/modalForm';
import searchReducer from './modules/search';
import submissionsReducer from './modules/submissions';
import submissionReducer from './modules/submission';
import submissionCountsReducer from './modules/submissionCounts';
import systemErrorReducer from './modules/systemError';

export default {
  layout: layoutReducer,
  kinops: kinopsReducer,
  categories: categoriesReducer,
  forms: formsReducer,
  modalForm: modalFormReducer,
  search: searchReducer,
  submissions: submissionsReducer,
  submission: submissionReducer,
  submissionCounts: submissionCountsReducer,
  systemError: systemErrorReducer,
};
