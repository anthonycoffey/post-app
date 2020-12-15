import { getAsyncActionTypes } from '../utils';

export const TYPE_GET_COURSE = getAsyncActionTypes('GET_COURSE');
export const getCourseRequest = request => ({
  type: TYPE_GET_COURSE.REQUEST,
  request
});
export const getCourseSuccess = response => ({
  type: TYPE_GET_COURSE.SUCCESS,
  response
});
export const getCourseFailure = error => ({
  type: TYPE_GET_COURSE.FAILURE,
  error
});

// export const TYPE_UPDATE_COURSE = getAsyncActionTypes('UPDATE_COURSE');
// export const updateCourseRequest = request => ({
//   type: TYPE_UPDATE_COURSE.REQUEST,
//   request
// });
// export const updateCourseSuccess = response => ({
//   type: TYPE_UPDATE_COURSE.SUCCESS,
//   response
// });
// export const updateCourseFailure = error => ({
//   type: TYPE_UPDATE_COURSE.FAILURE,
//   error
// });

