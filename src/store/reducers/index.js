import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import exams from '../assets/exams'

import {
  TOGGLE_DRAWER,
  SELECT_SCHEDULE,
  CHANGE_SCHEDULE_STATUS,
  SET_SCHEDULE_EVENTS,
  SET_SCHEDULE_GROUPS,
  CHANGE_BEGIN_DATE,
  CHANGE_END_DATE,
  SELECT_GROUPER_PERIOD,
  scheduleStatus,
  grouperPeriods,
} from '../actions';

function drawerOpen (state = false, action) {
  switch (action.type) {
  case TOGGLE_DRAWER:
    return !state;
  default:
    return state;
  }
}

function selectedSchedule (state = -1, action) {
  switch (action.type) {
  case SELECT_SCHEDULE:
    return action.payload;
  default:
    return state;
  }
}

function schedules (state = { exams }, action) {
  return state;
}

const initialSchedule = {
  schedule: 'exams',
  status: scheduleStatus.none,
  events: [],
  groups: [],
  beginDate: new Date(exams.from),
  endDate: new Date(exams.to),
  grouperPeriod: grouperPeriods.Day,
};

function description (state, action) {
  switch (action.type) {
  case CHANGE_SCHEDULE_STATUS:
    return { ...state, status: action.payload };
  case SET_SCHEDULE_EVENTS:
    return { ...state, events: action.payload, status: scheduleStatus.regroup };
  case SET_SCHEDULE_GROUPS:
    return { ...state, groups: action.payload, status: scheduleStatus.loaded };
  case CHANGE_BEGIN_DATE:
    return { ...state, beginDate: action.payload };
  case CHANGE_END_DATE:
    return { ...state, endDate: action.payload };
  case SELECT_GROUPER_PERIOD:
    return { ...state, grouperPeriod: action.payload };
  default:
    return state;
  }
}

function descriptions (state = [ initialSchedule ], action) {
  switch (action.type) {
  case CHANGE_SCHEDULE_STATUS:
  case SET_SCHEDULE_EVENTS:
  case SET_SCHEDULE_GROUPS:
  case CHANGE_BEGIN_DATE:
  case CHANGE_END_DATE:
  case SELECT_GROUPER_PERIOD:
    return state.map((item, id) => id === action.id ? description(item, action) : item);
  default:
    return state;
  }
}

export default (history) => combineReducers({
  drawerOpen,
  selectedSchedule,
  schedules,
  descriptions,
  router: connectRouter(history)
});