import { combineReducers } from 'redux';

import course from './course.reducer';
import status from './status.reducer';

export default combineReducers({
  course,
  status,
});
