import { STATUS_CODES } from "../../config/data";
import { TYPE_GET_COURSE } from "../actions/course.action";

const initialState = {
  status: STATUS_CODES.INITIAL,
  course: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    // TYPE_GET_COURSE
    case TYPE_GET_COURSE.REQUEST:
      return {
        ...state,
        status: STATUS_CODES.GET_COURSE_REQUESTED,
      };
    case TYPE_GET_COURSE.SUCCESS:
      return {
        ...state,
        ...action.response,
        status: STATUS_CODES.GET_COURSE_SUCCEEDED,
      };
    case TYPE_GET_COURSE.FAILURE:
      return {
        ...state,
        status: STATUS_CODES.GET_COURSE_FAILED,
      };
    default:
      return state;
  }
};
