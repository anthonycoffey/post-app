import { STATUS_CODES } from "../../config/data";
import {
  TYPE_SET_CHAPTER_INDEX,
  TYPE_SET_PAGE_INDEX,
  TYPE_SET_HEADER_TITLE,
} from "../actions/status.action";

const initialState = {
  status: STATUS_CODES.INITIAL,
  chapterIndex: -1,
  pageIndex: 0,
  headerTitle: "Main Menu",
};

export default (state = initialState, action) => {
  switch (action.type) {
    // TYPE_GET_COURSE
    case TYPE_SET_CHAPTER_INDEX.REQUEST:
      return {
        ...state,
        chapterIndex: action.payload.chapterIndex,
      };
    case TYPE_SET_PAGE_INDEX.REQUEST:
      return {
        ...state,
        pageIndex: action.payload.pageIndex,
      };
    case TYPE_SET_HEADER_TITLE.REQUEST:
      return {
        ...state,
        headerTitle: action.payload.headerTitle,
      };
    default:
      return state;
  }
};
