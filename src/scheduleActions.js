import { Loader, Grouper } from 'schedule-core';

import {
  CHANGE_SCHEDULE_STATUS,
  SET_SCHEDULE_EVENTS,
  SET_SCHEDULE_GROUPS,
  CHANGE_BEGIN_DATE,
  CHANGE_END_DATE,
  SELECT_GROUPER_PERIOD,
} from './actionTypes';

export const scheduleStatus = {
  NONE: 'NONE',
  LOADING: 'LOADING',
  REGROUP: 'REGROUP',
  LOADED: 'LOADED',
};

export const grouperPeriods = {
  Day: 'day',
  Week: 'week',
  Month: 'month',
};

export function changeScheduleStatus (index, status) {
  return { type: CHANGE_SCHEDULE_STATUS, index, status };
}

function setScheduleEvents (index, events) {
  return { type: SET_SCHEDULE_EVENTS, index, events };
}

function setScheduleGroups (index, groups) {
  return { type: SET_SCHEDULE_GROUPS, index, groups };
}

export function changeBeginDate (index, date) {
  return { type: CHANGE_BEGIN_DATE, index, date };
}

export function changeEndDate (index, date) {
  return { type: CHANGE_END_DATE, index, date };
}

export function selectGrouperPeriod (index, period) {
  return { type: SELECT_GROUPER_PERIOD, index, period };
}

export function generateEvents (index, schedule) {
  return (dispatch) => {
    dispatch(changeScheduleStatus(index, scheduleStatus.LOADING));
    const loader = new Loader();
    const begin = new Date(schedule.from);
    const end = new Date(schedule.to);
    return loader.load(schedule)
      .then(gen => gen.run(begin, end))
      .then(data => Grouper.createEvents(data))
      .then(events => dispatch(setScheduleEvents(index, events)));
  };
}

export function groupEvents (index, groupBy, data) {
  return (dispatch) => {
    dispatch(changeScheduleStatus(index, scheduleStatus.LOADING));
    return Grouper.toList(data)
      .then(list => Grouper.groupBy(groupBy, list))
      .then(groups => dispatch(setScheduleGroups(index, groups)));
  };
}