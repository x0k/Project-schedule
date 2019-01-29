import { connect } from 'react-redux';

import { toggleDrawer } from '../appActions';

import Bar from '../components/bar';

const stateToProps = (state) => ({
  title: state.selectedSchedule >= 0 ? state.schedules[state.selectedSchedule].name : 'Select schedule'
});

const dispatchToProps = (dispatch) => ({
  drawerHandler: () => dispatch(toggleDrawer())
});

export default connect(stateToProps, dispatchToProps)(Bar);
