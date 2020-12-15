import { all } from 'redux-saga/effects';

import { watchGetCourse } from './course.saga';

export default function* rootSaga() {
  yield all([
    watchGetCourse(),
  ]);
}
