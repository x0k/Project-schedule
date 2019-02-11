import { Grouper, Loader } from 'schedule-core';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const SELECT_SCHEDULE = 'SELECT_SCHEDULE';

export const CHANGE_SCHEDULE_STATUS = 'CHANGE_SCHEDULE_STATUS';

export const SET_SCHEDULE_EVENTS = 'SET_SCHEDULE_EVENTS';

export const SET_SCHEDULE_GROUPS = 'SET_SCHEDULE_GROUPS';

export const CHANGE_BEGIN_DATE = 'CHANGE_BEGIN_DATE';

export const CHANGE_END_DATE = 'CHANGE_END_DATE';

export const SELECT_GROUPER_PERIOD = 'SELECT_GROUPER_PERIOD';

export const grouperPeriods = {
  Day: 'day',
  Week: 'week',
  Month: 'month',
};

export const scheduleStatus = {
  none: 'none',
  loading: 'loading',
  regroup: 'regroup',
  loaded: 'loaded',
};

const simpleAction = (type) => () => ({ type });

const transferAction = (type) => (payload) => ({ type, payload });

const indexedAction = (type) => (id, payload) => ({ type, id, payload, });

const createActions = (builder, ...actions) => actions.map(action => builder(action));

const [ toggleDrawer ] = createActions(simpleAction,
  TOGGLE_DRAWER
);

const [ selectSchedule ] = createActions(transferAction,
  SELECT_SCHEDULE
);

const [ changeScheduleStatus, setScheduleEvents, setScheduleGroups, changeBeginDate, changeEndDate, selectGrouperPeriod ] = createActions(indexedAction,
  CHANGE_SCHEDULE_STATUS,
  SET_SCHEDULE_EVENTS,
  SET_SCHEDULE_GROUPS,
  CHANGE_BEGIN_DATE,
  CHANGE_END_DATE,
  SELECT_GROUPER_PERIOD
);

export {
  toggleDrawer,
  changeScheduleStatus,
  selectSchedule,
  changeBeginDate,
  changeEndDate,
  selectGrouperPeriod
};

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