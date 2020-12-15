import { call, put, takeLatest } from 'redux-saga/effects';
import course_data from '../../config/course_data.json';

// import httpService from '../../services/http.service';
import {
  TYPE_GET_COURSE,
  getCourseSuccess,
  getCourseFailure,
} from '../actions/course.action';

function* doGetCourse(action) {
  // const params = action.request;
  try {
    const getCourse = () => {
      return new Promise((resolve) => {
        resolve(course_data);
      });
    }
    const course = yield call(getCourse);
    yield put(getCourseSuccess({ course }));
  } catch (e) {
    yield put(getCourseFailure());
  }
}

export function* watchGetCourse() {
  yield takeLatest(TYPE_GET_COURSE.REQUEST, doGetCourse);
}
