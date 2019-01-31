import { connect } from 'react-redux';

import { toggleDrawer } from '../appActions';

import Bar from '../components/bar';

const stateToProps = (state) => {
  const title = state.selectedSchedule >= 0 ? state.schedules[state.descriptions[state.selectedSchedule].schedule].name : 'Select schedule';
  return { title };
};

const dispatchToProps = (dispatch) => ({
  drawerHandler: () => dispatch(toggleDrawer())
});

export default connect(stateToProps, dispatchToProps)(Bar);
