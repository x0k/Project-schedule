import { connect } from 'react-redux';

import {
  generateEvents,
  groupEvents,
} from '../scheduleActions';

import Schedule from '../components/schedule';

const stateToProps = (state) => ({ ...state.schedules[state.selectedSchedule] });

const dispatchToProps = (dispatch) => ({
  generateEvents: (index, schedule, begin, end) => dispatch(generateEvents(index, schedule, begin, end)),
  groupEvents: (index, groupBy, data) => dispatch(groupEvents(index, groupBy, data)),
});

export default connect(stateToProps, dispatchToProps)(Schedule);