import {
  TOGGLE_DRAWER,
  SELECT_SCHEDULE
} from './actionTypes';

export const grouperPeriods = {
  DAY: 'Day',
  WEEK: 'Week',
  MONTH: 'Month',
};

export function toggleDrawer () {
  return { type: TOGGLE_DRAWER };
}

export function selectSchedule (index) {
  return { type: SELECT_SCHEDULE, index };
}