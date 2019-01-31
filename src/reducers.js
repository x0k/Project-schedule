import { combineReducers } from 'redux';

import exams from './assets/exams';

import * as Actions from './actionTypes';
import { scheduleStatus, grouperPeriods } from './scheduleActions';

function drawerOpen (state = false, action) {
  switch (action.type) {
  case Actions.TOGGLE_DRAWER:
    return !state.drawerOpen;
  default:
    return state;
  }
}

function selectedSchedule (state = -1, action) {
  switch (action.type) {
  case Actions.SELECT_SCHEDULE:
    return action.index;
  default:
    return state;
  }
}

function schedules (state = { exams }, action) {
  return state;
}

const initialSchedule = {
  schedule: 'exams',
  status: scheduleStatus.NONE,
  events: [],
  groups: [],
  beginDate: new Date(exams.from),
  endDate: new Date(exams.to),
  grouperPeriod: grouperPeriods.Day,
};

function description (state, action) {
  switch (action.type) {
  case Actions.CHANGE_SCHEDULE_STATUS:
    return { ...state, status: action.status };
  case Actions.SET_SCHEDULE_EVENTS:
    return { ...state, events: action.events, status: scheduleStatus.REGROUP };
  case Actions.SET_SCHEDULE_GROUPS:
    return { ...state, groups: action.groups, status: scheduleStatus.LOADED };
  case Actions.CHANGE_BEGIN_DATE:
    return { ...state, beginDate: action.date };
  case Actions.CHANGE_END_DATE:
    return { ...state, endDate: action.date };
  case Actions.SELECT_GROUPER_PERIOD:
    return { ...state, grouperPeriod: action.period };
  default:
    return state;
  }
}

function descriptions (state = [ initialSchedule ], action) {
  return state.map((item, id) => id === action.index ? description(item, action) : item);
}

export default combineReducers({
  drawerOpen,
  selectedSchedule,
  schedules,
  descriptions
});