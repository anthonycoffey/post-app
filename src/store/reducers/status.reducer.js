import { STATUS_CODES } from "../../config/data";
import * as actions from "../actions/status.action";

const initialState = {
  status: STATUS_CODES.INITIAL,
  chapterIndex: -1,
  isInitial: true,
  initialIndex: 0,
  pageIndex: 0,
  headerTitle: "Main Menu",
  completed: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    // TYPE_GET_COURSE
    case actions.TYPE_SET_CHAPTER_INDEX.REQUEST:
      return {
        ...state,
        chapterIndex: action.payload.chapterIndex,
      };
    case actions.TYPE_SET_PAGE_INDEX.REQUEST:
      return {
        ...state,
        pageIndex: action.payload.pageIndex,
      };
    case actions.TYPE_SET_INITIAL_INDEX.REQUEST:
      return {
        ...state,
        initialIndex: action.payload.initialIndex,
      };
    case actions.TYPE_SET_HEADER_TITLE.REQUEST:
      return {
        ...state,
        headerTitle: action.payload.headerTitle,
      };
    case actions.TYPE_SET_COMPLETED.REQUEST:
      const { status, page, chapter } = action.payload;
      return {
        ...state,
        completed: {
          ...state.completed,
          [chapter]: {
            ...state.completed[chapter],
            [`page_${page + 1}`]: status,
          },
        },
      };
    default:
      return state;
  }
};
