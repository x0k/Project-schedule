import { connect } from 'react-redux';

import {
  changeBeginDate,
  changeEndDate,
  selectGrouperPeriod,
  changeScheduleStatus,
  scheduleStatus,
} from '../scheduleActions';

import ControlPanel from '../components/controlPanel';


const stringToDate = str => {
  const matches = str.match(/(\d+)-(\d+)-(\d+)/);
  const zb = val => parseInt(val[0] === '0' ? val.slice(1) : val);
  return new Date(matches[1], zb(matches[2]) - 1, zb(matches[3]));
};

const dateToString = date => {
  const zb = val => val < 10 ? '0' + val : val;
  return `${date.getFullYear()}-${zb(date.getMonth()+1)}-${zb(date.getDate())}`;
};

const dispatchToProps = (dispatch) => {
  const dateHandler = (action) => (id) => (event) => {
    dispatch(action(id, stringToDate(event.target.value)));
    dispatch(changeScheduleStatus(id, scheduleStatus.REGROUP));
  };
  return {
    beginDateHandler: dateHandler(changeBeginDate),
    endDateHandler: dateHandler(changeEndDate),
    menuHandler: (id) => (event) => {
      dispatch(selectGrouperPeriod(id, event.target.value));
      dispatch(changeScheduleStatus(id, scheduleStatus.REGROUP));
    }
  };
};

const stateToProps = (state, { schedule }) => {
  const { beginDate, endDate, grouperPeriod: groupBy } = state.descriptions[schedule];
  return {
    from: dateToString(beginDate),
    to: dateToString(endDate),
    groupBy
  };
};

export default connect(stateToProps, dispatchToProps)(ControlPanel);