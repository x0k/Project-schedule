import { connect } from 'react-redux';

import {
  generateEvents,
  groupEvents,
} from '../actions';

import Schedule from '../components/schedule';

const stateToProps = (state, { id }) => {
  const description = state.descriptions[id];
  const schedule = state.schedules[description.schedule];
  return { description, schedule };
};

const dispatchToProps = (dispatch) => ({
  generateEvents: (index, schedule) => dispatch(generateEvents(index, schedule)),
  groupEvents: (index, groupBy, data) => dispatch(groupEvents(index, groupBy, data)),
});

export default connect(stateToProps, dispatchToProps)(Schedule);