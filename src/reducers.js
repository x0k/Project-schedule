import { combineReducers } from 'redux';

import exams from './assets/exams';

import * as Actions from './actionTypes';
import { scheduleStatus, grouperPeriods } from './scheduleActions';

const initialSchedule = {
  ...exams,
  status: scheduleStatus.NONE,
  events: [],
  groups: [],
  beginDate: new Date(exams.from),
  endDate: new Date(exams.to),
  grouperPeriod: grouperPeriods.Day,
};

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

const buildModifier = (state, action) => (field, newName) => state.map((schedule, index) =>
  index === action.index ? { ...schedule, [newName || field]: action[field] }: schedule
);

function schedules (state = [ initialSchedule ], action) {
  const mod = buildModifier(state, action);
  switch (action.type) {
  case Actions.CHANGE_SCHEDULE_STATUS:
    return mod('status');
  case Actions.SET_SCHEDULE_EVENTS:
    return mod('events');
  case Actions.SET_SCHEDULE_GROUPS:
    return mod('groups');
  case Actions.CHANGE_BEGIN_DATE:
    return mod('date', 'beginDate');
  case Actions.CHANGE_END_DATE:
    return mod('date', 'endDate');
  case Actions.SELECT_GROUPER_PERIOD:
    return mod('period', 'grouperPeriod');
  default:
    return state;
  }
}

export default combineReducers({
  drawerOpen,
  selectedSchedule,
  schedules
});